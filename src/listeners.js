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
        // let formInput = {
        //     name: wishListInput.value
        // }
        // WishList.submitWishList({wish_list: formInput})
        //     .then(() => wishListInput.value = "")   

        let formInput = {}
        target.querySelectorAll("#wish-list-input").forEach(function(wishListInput) {
            formInput[wishListInput.name] = wishListInput.value
        })
        WishList.submitWishList(formInput)
    }
})