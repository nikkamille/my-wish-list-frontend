class WishList {

    constructor(wishList){
        this.id = wishList.id
        this.name = wishList.name
    }

    static fetchAllWishLists(){
        return fetch(wishListUrl, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                } else {
                    return res.text().then(error => Promise.reject(error))
                }
            })
            .then(wishListArray => {
                this.collection = wishListArray.map(wishList => new WishList(wishList))
                console.log(this)
                debugger
            })
        // // .then(wishLists => wishLists.forEach(renderWishList))
        // .then(wishLists => {
        //     this.collection = wishLists.map()
        // })
    }

    // Fill the elements with this html:
    // <li class="transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4">
    //     <a href="#" class="block text-center font-medium py-4 col-span-6 text-xl">Birthday Wishes</a>
    //     <a href="#"><i class="far fa-edit"></i></a>
    //     <a href="#" class="float-right"><i class="far fa-trash-alt"></i></a>
    // </li>

    renderWishList() {
        this.liElement ||= document.createElement("li")
        this.liElement.class = "transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4"
        
        this.listName ||= document.createElement("a")
        this.listName.class = "block text-center font-medium py-4 col-span-6 text-xl"

        this.editLink ||= document.createElement("a")
        this.editLink.class = "far fa-edit"
    }





    
    // static submitWishList(){
    //     event.preventDefault()
    
    //     const configObj = {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name: wishListInput.value
    //         })
    //     }
    
    //     fetch(wishListUrl, configObj)
    //     .then(res => res.json())
    //     .then(renderWishList)
    
    //     // renderWishList(wishListInput.value)
    
    // }
    
    // renderWishList(){
    //     // console.log(this)
    //     const li = document.createElement('li')
    //     li.dataset.id = myWishList.id
    
    //     const p = document.createElement('p')
    //     p.innerText = myWishList.name
    
    //     const itemForm = document.createElement('form')
    //     itemForm.innerHTML += `<label for="item-name">Item: </label><input type="text" id="item-name" required><br/>
    //         <label for="item-price">Price: </label><input type="number" id="item-price" required><br/>
    //         <label for="item-url">Website: </label><input type="text" id="item-url" required><br/>
    //         <label for="item-image-url">Image Link: </label><input type="text" id="item-image-url" required><br/>
    //     <input type="submit">`
    //     itemForm.addEventListener("submit", renderItem)
        
    //     // const itemContainer = document.createElement('ul')
    
    //     // li.append(p, itemForm, itemContainer)
    //     li.append(p, itemForm)
      
    //     wishLists.appendChild(li)
    
    //     wishListForm.reset()
    // }
    
}