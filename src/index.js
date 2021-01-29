import "./styles.less";
import api from "./api/api.js";
import card from "./components/card/card.js";
import cardList from "./components/cardList/cardList.js"

api.getMyBooks().then((result) => {
  result.books.forEach(function (book) {
    var cardDOM = card.getCard.bind(book).call()
    var liDOM = document.createElement("li")
    liDOM.setAttribute("draggable", true)
    liDOM.ondragstart = drag
    // liDOM.addEventListener("dragStart", drag);
    liDOM.id = book.id;
    //<li draggable="true" id="drag1" ondragstart="drag(event)">
    switch (book.shelf) {
      case "currentlyReading":
        document.querySelector("#books-currently-reading ol").appendChild(liDOM).appendChild(cardDOM);
        break;
      case "wantToRead":
        document.querySelector("#books-want-to-read ol").appendChild(liDOM).appendChild(cardDOM);
        break;
      case "read":
        document.querySelector("#books-read ol").appendChild(liDOM).appendChild(cardDOM);
        break;
    }
  });
});

document.querySelector(".list-books-content div").appendChild(cardList.getCardListDOM.bind({
  title: "Currently Reading",
  id: "books-currently-reading"
}).call());

document.querySelector(".list-books-content div").appendChild(cardList.getCardListDOM.bind({
  title: "Want to Read",
  id: "books-want-to-read"
}).call());

document.querySelector(".list-books-content div").appendChild(cardList.getCardListDOM.bind({
  title: "Read",
  id: "books-read"
}).call());


// Por enquanto até eu entender essa bagaça
window.allowDrop = (ev) => {
  ev.preventDefault();
};

document.addEventListener("dragenter", function (event) {
  if (event.target.className == "books-grid") {
    // event.target.style.background = 'repeating-linear-gradient(-55deg,#222,#222 10px,  #333 10px,#333 20px)'
    event.target.style.opacity = '30%'
  }
});

document.addEventListener("dragleave", function (event) {
  if (event.target.className == "books-grid") {
    // event.target.style.background = ""
    event.target.style.opacity = '1'
  }
});

window.drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

window.drop = (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.path.forEach((ob) => {
    if (ob.nodeName == "OL") {
      ob.appendChild(document.getElementById(data));
      // event.target.style.background = ""
      event.target.style.opacity = '1'
    }
  });
};