const wishListForm = document.getElementById("wish-list-form")
const wishListInput = document.getElementById("wish-list-input")
const wishLists = document.getElementById("wish-lists")
const wishListUrl = `http://localhost:3000/wish_lists`
const itemsUrl = `http://localhost:3000/items`
const itemContainer = document.getElementById("item-container")
const itemsList = document.getElementById("items-list")

function fetchWishLists(){
    fetch(wishListUrl)
    .then(res => res.json())
    // .then(wishLists => wishLists.forEach(myWishList => renderWishList(myWishList)))
    .then(wishLists => wishLists.forEach(renderWishList))
}

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
    .then(res => res.json())
    .then(renderWishList)

    // renderWishList(wishListInput.value)

}

function renderWishList(myWishList){
    const li = document.createElement('li')
    li.dataset.id = myWishList.id

    const p = document.createElement('p')
    p.innerText = myWishList.name

    const itemForm = document.createElement('form')
    itemForm.innerHTML += `<label for="item-name">Item: </label><input type="text" id="item-name" required><br/>
        <label for="item-price">Price: </label><input type="number" id="item-price" required><br/>
        <label for="item-url">Website: </label><input type="text" id="item-url" required><br/>
        <label for="item-image-url">Image Link: </label><input type="text" id="item-image-url" required><br/>
    <input type="submit">`
    itemForm.addEventListener("submit", renderItem)
    
    // const itemContainer = document.createElement('ul')

    // li.append(p, itemForm, itemContainer)
    li.append(p, itemForm)
  
    wishLists.appendChild(li)

    wishListForm.reset()
}


function renderItem(e){
    e.preventDefault()
    // console.log(e.target.nextElementSibling)
    
    const itemNameInput = e.target.children[1].value
    const itemPriceInput = e.target.children[4].value
    const itemUrlInput = e.target.children[7].value
    const itemImageUrlInput = e.target.children[10].value
    const wishListId = e.target.parentElement.dataset.id
    
    // const itemAttributes = {
    //     itemName = document.createElement('li').innerText = itemNameInput,
    //     itemPrice = document.createElement('li').innerText = itemPriceInput,
    //     itemUrl = document.createElement('li').innerText = itemUrlInput,
    //     itemImageUrl = document.createElement('li').innerText = itemImageUrlInput 
    // }
    // console.log(itemAttributes)

    const itemName = document.createElement('li')
    itemName.innerText = itemNameInput
    const itemPrice = document.createElement('li')
    itemPrice.innerText = itemPriceInput
    const itemUrl = document.createElement('li')
    itemUrl.innerText = itemUrlInput
    const itemImageUrl = document.createElement('li')
    itemImageUrl.innerText = itemImageUrlInput

    itemContainer.append(itemName, itemPrice, itemUrl, itemImageUrl)
    // itemDiv.appendChild(itemContainer)

    submitItem(itemNameInput, itemPriceInput, itemUrlInput, itemImageUrlInput, wishListId)
    
    e.target.reset()
    
}

function submitItem(itemName, itemPrice, itemUrl, itemImageUrl, wishListId) {
    fetch(itemsUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: itemName,
            price: itemPrice, 
            url: itemUrl,
            image_url: itemImageUrl,
            wish_list_id: wishListId
        })
    })
    
}

fetchWishLists()