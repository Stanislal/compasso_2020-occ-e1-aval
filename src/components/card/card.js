import api from "../../api/api.js"

function moveTo() {
    console.log(this)
}

function createCardDOM() {
    var book = this;
    var card = document.createElement('div')
    card.classList.add("book", "drag-me")
    card.innerHTML = `
        <div class="book-top">
            <div class="book-cover img-thumbnail"
            style='width:128px;height:193px;background-image:url("${book.imageLinks.thumbnail}")'>
            </div>
            <div class="book-shelf-changer">
            <select id="book-${this.id}" onchange="moveTo(event)">
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div class="book-title">${book.title}</div>
        <div class="book-authors">${book.authors}</div>
        <div class="book-pages">Paginas: ${book.pageCount}</div>
    `
    return card;
}



function getCard() {
    return createCardDOM.bind(this).call();;
}

export default {
    getCard
}