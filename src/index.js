const wishListForm = document.getElementById("wish-list-form")
const wishListInput = document.getElementById("wish-list-input")
const wishList = document.getElementById("wish-list")
const wishListUrl = `http://localhost:3000/wish_lists`

wishListForm.addEventListener("submit", submitWishList)

function submitWishList(){
    event.preventDefault()

    const configObj = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: wishListInput.value
        })
    }

    fetch(wishListUrl, configObj)

    displayWishList()

}

function displayWishList(){
    const li = document.createElement('li')

    const p = document.createElement('p')
    p.innerText = wishListInput.value

    const itemForm = document.createElement('form')
    itemForm.innerHTML += `<label for="item-name">Item: </label><input type="text" id="item-name" required><br/>
        <label for="item-price">Price: </label><input type="number" id="item-price" required><br/>
        <label for="item-url">Website: </label><input type="text" id="item-url" required><br/>
        <label for="item-image-url">Image Link: </label><input type="text" id="item-image-url" required><br/>
    <input type="submit">`
    itemForm.addEventListener("submit", submitItem)
    
    const itemContainer = document.createElement('ul')

    li.append(p, itemForm, itemContainer)
     
    wishList.appendChild(li)

    wishListForm.reset()
}

function submitItem(e){
    e.preventDefault()
    const itemNameInput = e.target.children[1].value
    const itemPriceInput = e.target.children[4].value
    const itemUrlInput = e.target.children[7].value
    const itemImageUrlInput = e.target.children[10].value
    
    const itemContainer = e.target.nextElementSibling
    const itemName = document.createElement('li')
    itemName.innerText = itemNameInput
    const itemPrice = document.createElement('li')
    itemPrice.innerText = itemPriceInput
    const itemUrl = document.createElement('li')
    itemUrl.innerText = itemUrlInput
    const itemImageUrl = document.createElement('li')
    itemImageUrl.innerText = itemImageUrlInput

    itemContainer.append(itemName, itemPrice, itemUrl, itemImageUrl)
    e.target.reset()
    
}