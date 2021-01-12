document.addEventListener("DOMContentLoaded", function(e) {
    WishList.fetchAllWishLists()
})

document.addEventListener("click", function(e) {
    console.dir(e.target)
})