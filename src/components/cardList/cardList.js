function createCardListDOM() {
    var cardList = document.createElement("div")
    cardList.classList.add("bookshelf")
    cardList.innerHTML = `
        <h2 class="bookshelf-title">${this.title}</h2>
        <div id="${this.id}" ondrop="drop(event)" ondragover="allowDrop(event)" class="bookshelf-books">
            <ol class="books-grid">
            </ol>
        </div>
    `
    return cardList
}

function getCardListDOM() {
    return createCardListDOM.bind(this).call();
}

export default {
    getCardListDOM
}