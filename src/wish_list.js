class WishList {

    constructor(wishList){
        this.id = wishList.id
        this.name = wishList.name
    }

    static wishListContainer() {
        return this.wishList ||= document.getElementById("wish-lists")
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
                let renderedWishLists = this.collection.map(wishList => wishList.renderWishList())
                this.wishListContainer().append(...renderedWishLists)
                return this.collection
            })    
    }

    // static submitWishList() {
    //     event.preventDefault()
    //     debugger
    //     // console.log(wishListInput.value)
    //     return fetch(wishListUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(wishListInput.value)
    //     })
    //     .then(res => {
    //         if(res.ok) {
    //             return res.json()
    //         } else {
    //             return res.text().then(error => Promise.reject(error))
    //         }
    //     })
    //     .then(wishListAttributes => {
    //         let wishList = new WishList(wishListAttributes)
    //         this.collection.push(wishList)
    //         this.wishListContainer().appendChild(wishList.renderWishList())
    //         return wishList
            
    //     })
    // }

    


    // Fill the elements with this html:
    // <li class="transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4">
    //     <a href="#" class="block text-center font-medium py-4 col-span-6 text-xl">Birthday Wishes</a>
    //     <a href="#"><i class="far fa-edit"></i></a>
    //     <a href="#" class="float-right"><i class="far fa-trash-alt"></i></a>
    // </li>

    static submitWishList(){
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
        .then(data => {
            let newWishList = new WishList(data)
            newWishList.renderWishList()
        })
        // .then(renderWishList())
    
        // renderWishList(wishListInput.value)
    
    }

    renderWishList() {
        this.liElement ||= document.createElement("li")
        this.liElement.classList.add(..."transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4".split(" "))
        this.liElement.dataset.id = this.id

        this.listName ||= document.createElement("a")
        this.listName.classList.add(..."block text-center font-medium py-4 col-span-6 text-xl".split(" "))
        this.listName.textContent = this.name

        this.editLink ||= document.createElement("a") 
        this.editLink.innerHTML = `<i class="far fa-edit"></i>`

        this.deleteLink ||= document.createElement("a")
        this.deleteLink.classList.add(..."float-right".split(" "))
        this.deleteLink.innerHTML = `<i class="far fa-trash-alt"></i>`

        this.liElement.append(this.listName, this.editLink, this.deleteLink)
        // globalThis.wishListContainer.appendChild(this.liElement)
        this.constructor.wishListContainer().appendChild(this.liElement)

        return this.liElement
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