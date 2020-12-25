const wishListForm = document.getElementById("wish-list-form")
const wishListInput = document.getElementById("wish-list-input")
const wishList = document.getElementById("wish-list")
const wishListUrl = `http://localhost:3000/wish_lists`

wishListForm.addEventListener("submit", submitWishList)

function submitWishList(){
    event.preventDefault()
    displayWishList()

}

function displayWishList(){
    const li = document.createElement('li')

    const p = document.createElement('p')
    p.innerText = wishListInput.value

    const itemForm = document.createElement('form')
    itemForm.innerHTML += `<input type="text" id="item-form"><input type="submit">`
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