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
    itemForm.innerHTML += `<label for="item-name">Item: </label>
        <input type="text" id="item-name" required><br/>
        <label for="item-price">Price: </label>
        <input type="number" id="item-price" required><br/>
        <label for="item-url">Website: </label>
        <input type="text" id="item-url" required><br/>
        <label for="image-url">Image Link: </label>
        <input type="text" id="image-url"><br/>
    <input type="submit">`
    itemForm.addEventListener("submit", submitItem)
    
    const itemList = document.createElement('ul')

    li.append(p, itemForm, itemList)
     
    wishList.appendChild(li)

    wishListForm.reset()
}

function submitItem(e){
    e.preventDefault()
    const itemInput = e.target.children[0].value
    const itemList = e.target.nextElementSibling

    const li = document.createElement('li')
    li.innerText = itemInput
    itemList.appendChild(li)
    e.target.reset()
    
}