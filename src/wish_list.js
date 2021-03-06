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

    // Save the objects inside the this.collection.

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
        wishListForm.reset() 
    }

    renderWishList() {
        this.liElement ||= document.createElement("li")
        this.liElement.classList.add(..."transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4".split(" "))
        this.liElement.dataset.id = this.id

        this.listNameLink ||= document.createElement("a")
        this.listNameLink.setAttribute("name", this.name)
        this.listNameLink.classList.add(..."block text-center font-medium p-2 col-span-6 text-xl cursor-pointer".split(" "))
        this.listNameLink.textContent = this.name

        this.deleteButton ||= document.createElement("button")
        this.deleteButton.classList.add(..."focus:outline-none".split(" "))
        this.deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`

        this.liElement.append(this.listNameLink, this.deleteButton)
        this.constructor.wishListContainer().appendChild(this.liElement)

        this.listNameLink.addEventListener("click", this.showWishList)
        this.deleteButton.addEventListener("click", this.deleteWishList)
        return this.liElement
    }

    // <h3 class="font-sans text-4xl font-medium text-purple-900 text-center m-4">List Name</h3>

    showWishList() {
        const wishListId = this.parentElement.dataset.id
        let h3ListName = document.createElement("h3")
        h3ListName.setAttribute("name", this.name)
        h3ListName.classList.add(..."font-sans text-4xl font-medium text-purple-900 text-center m-4".split(" "))
        h3ListName.innerHTML = this.name
        h3ListName.dataset.id = this.parentElement.dataset.id
        
        wishListNameContainer.innerHTML = ""
        wishListNameContainer.appendChild(h3ListName)
        wishListNameContainer.insertBefore(h3ListName, wishListNameContainer.firstChild)

        return fetch(`${wishListUrl}/${wishListId}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(({id, items}) => {
                Item.loadFromWishList(id, items)
            })
    }

    deleteWishList() {
        let confirmDelete = confirm("Are you sure you want to delete? This will remove all items inside your wish list.")
        const wishListId = this.parentElement.dataset.id
        let itemsListChildren = itemsList.children[0]
        if(confirmDelete) {
            fetch(`${wishListUrl}/${wishListId}`, {
                method: "DELETE"
            })
            
            this.parentElement.remove()
            itemsListChildren.remove()
        }
        
    }
    
}