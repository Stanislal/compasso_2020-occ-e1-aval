function createCardListDOM() {
    var cardList = document.createElement("div")
    cardList.classList.add("bookshelf", "col-lg-4", "col-md-12")
    cardList.innerHTML = `
        <h2 class="bookshelf-title">${this.title}</h2>
        <div id="${this.id}" data-shelf="${this.shelf}" ondrop="drop(event)" ondragover="allowDrop(event)" class="bookshelf-books">
            <ol class="books-grid">
            </ol>
        </div>
    `
    return cardList
}

function getCardListDOM() {
    return createCardListDOM.bind(this).call()
}

export default {
    getCardListDOM
}