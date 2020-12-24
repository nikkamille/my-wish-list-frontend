const wishListForm = document.getElementById("wish-list-form")
const wishListInput = document.getElementById("wish-list-input")

wishListForm.addEventListener("submit", submitWishList)

function submitWishList(){
    event.preventDefault()
    console.log(wishListInput.value)
}