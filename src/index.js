import "./styles.less";
import api from "./api/api.js";
import card from "./components/card/card";

api.getMyBooks().then((result) => {
  result.books.forEach(function (book) {
    var cardDOM = card.getCard.bind(book).call();
    switch (book.shelf) {
      case "currentlyReading":
        document.querySelector("#books-currently-reading ol").appendChild(document.createElement("li")).appendChild(cardDOM);
        break;
      case "wantToRead":
        document.querySelector("#books-want-to-read ol").appendChild(document.createElement("li")).appendChild(cardDOM);
        break;
      case "read":
        document.querySelector("#books-read ol").appendChild(document.createElement("li")).appendChild(cardDOM);
        break;
    }

  });

});

// Por enquanto até eu entender essa bagaça
window.allowDrop = (ev) => {
  ev.preventDefault();
};

window.drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

window.drop = (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.path.forEach((ob) => {
    if (ob.nodeName == "OL") {
      ob.appendChild(document.getElementById(data));
    }
  });
};