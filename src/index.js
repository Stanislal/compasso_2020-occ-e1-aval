import "./styles.less"
import api from "./api/api.js"
import card from "./components/card/card.js"
import cardList from "./components/cardList/cardList.js"

api.getMyBooks().then((result) => {
  result.books.forEach(function (book) {
    var cardDOM = card.getCard.bind(book).call()
    var liDOM = document.createElement("li")
    // liDOM.classList.add("col-lg-6")
    liDOM.setAttribute("draggable", true)
    liDOM.ondragstart = drag
    // liDOM.addEventListener("dragStart", drag)
    liDOM.id = book.id
    //<li draggable="true" id="drag1" ondragstart="drag(event)">
    switch (book.shelf) {
      case "currentlyReading":
        document.querySelector("#books-currently-reading ol").appendChild(liDOM).appendChild(cardDOM)
        break
      case "wantToRead":
        document.querySelector("#books-want-to-read ol").appendChild(liDOM).appendChild(cardDOM)
        break
      case "read":
        document.querySelector("#books-read ol").appendChild(liDOM).appendChild(cardDOM)
        break
    }
  })
  checkShelfIsEmptyAndNotify();
})

document.querySelector("#btn-search-books").addEventListener("click", function (event) {
  const searchTerm = event.target.parentElement.querySelector("input").value;

  document.querySelector(".list-books-content .row").innerHTML = ""

  document.querySelector(".list-books-content .row").appendChild(cardList.getCardListDOM.bind({
    title: "Search Books",
    id: "books-search",
    shelf: "search"
  }).call())

  document.querySelector(".list-books-content .row").style = "display:flex"
  document.querySelector(".bookshelf").classList.remove("col-lg-4")
  document.querySelector(".bookshelf").classList.add("col-lg-12")
  api.searchBooks(searchTerm).then(result => {

    result.books.forEach(function (book) {
      var cardDOM = card.getCard.bind(book).call()
      var liDOM = document.createElement("li")
      let canAdd = true
      liDOM.setAttribute("draggable", true)
      liDOM.ondragstart = drag
      // liDOM.addEventListener("dragStart", drag)
      liDOM.id = book.id

      document.querySelectorAll("#my-books li").forEach(element => {
        if (element.id == book.id) {
          canAdd = false
        }
      });

      if (canAdd)
        document.querySelector("#books-search ol").appendChild(liDOM).appendChild(cardDOM)

    })

    checkShelfIsEmptyAndNotify()
  });
})


document.querySelector(".list-books-content #my-books").appendChild(cardList.getCardListDOM.bind({
  title: "Currently Reading",
  id: "books-currently-reading",
  shelf: "currentlyReading"
}).call())

document.querySelector(".list-books-content #my-books").appendChild(cardList.getCardListDOM.bind({
  title: "Want to Read",
  id: "books-want-to-read",
  shelf: "wantToRead"
}).call())

document.querySelector(".list-books-content #my-books").appendChild(cardList.getCardListDOM.bind({
  title: "Read",
  id: "books-read",
  shelf: "read"
}).call())


// Por enquanto até eu entender essa bagaça
window.allowDrop = (ev) => {
  ev.preventDefault()
}

document.addEventListener("dragenter", function (event) {})
document.addEventListener("dragleave", function (event) {})

document.addEventListener("dragend", function (event) {
  document.querySelectorAll(".books-grid li").forEach(elm => {
    elm.style.opacity = '1'
  })
})

document.addEventListener("dragover", function (event) {
  event.preventDefault()
})

window.drag = (ev) => {
  ev.target.style.opacity = '30%'
  ev.dataTransfer.setData("text", ev.target.id)
}

window.drop = function (ev) {
  ev.preventDefault()
  let data = ev.dataTransfer.getData("text")
  if (!data || ev.dataTransfer.items.length > 1) return
  event.path.forEach(element => {
    if (element.className == "books-grid") {
      var originShelf = document.getElementById(data).parentElement.parentElement.getAttribute("data-shelf")
      element.appendChild(document.getElementById(data))
      var shelf = element.parentElement.getAttribute("data-shelf")
      if (shelf != originShelf) {
        api.updateBook(data, shelf).then((result) => {
          console.log(result)
        })
      }
    }
  })
  checkShelfIsEmptyAndNotify()
}

const checkShelfIsEmptyAndNotify = () => {
  document.querySelectorAll(".bookshelf-books ol").forEach(element => {
    var emptyMessage = element.querySelector('h3')
    if (element.querySelectorAll('li').length == 0) {
      if (emptyMessage) return
      var empty = document.createElement("h3")
      empty.innerHTML = "Sua estante está vazia!"
      element.appendChild(empty)
    } else if (emptyMessage) {
      emptyMessage.remove()
    }
  })
}