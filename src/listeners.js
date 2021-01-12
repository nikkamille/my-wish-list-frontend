document.addEventListener("DOMContentLoaded", function(e) {
    WishList.fetchAllWishLists()
})

document.addEventListener("click", function(e) {
    console.dir(e.target)
})

document.addEventListener("submit", function(e) {
    let target = e.target
    if(target.matches("#wish-list-form")) {
        e.preventDefault()
    }
    
})