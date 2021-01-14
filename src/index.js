const wishListForm = document.getElementById("wish-list-form")
const wishListInput = document.getElementById("wish-list-input")
const wishListUrl = `http://localhost:3000/wish_lists`
const itemsUrl = `http://localhost:3000/items`
const itemContainer = document.getElementById("item-container")
const itemsList = document.getElementById("items-list")
const itemForm = document.getElementById("item-form")
const wishListNameContainer = document.getElementById("item-name-container")


document.addEventListener("DOMContentLoaded", function(e) {
    WishList.fetchAllWishLists()
})
wishListForm.addEventListener("submit", WishList.submitWishList)

itemForm.addEventListener("submit", Item.submitItem)