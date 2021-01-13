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

    // Fill the elements with this html:
    // <li class="transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4">
    //     <a href="#" class="block text-center font-medium py-4 col-span-6 text-xl">Birthday Wishes</a>
    //     <a href="#"><i class="far fa-edit"></i></a>
    //     <a href="#" class="float-right"><i class="far fa-trash-alt"></i></a>
    // </li>

    renderWishList() {
        this.liElement ||= document.createElement("li")
        this.liElement.classList.add(..."transition duration-700 ease-in-out bg-white hover:bg-pink-100 transform hover:-translate-y-1 hover:scale-110 shadow-xl rounded-md p-2 my-4".split(" "))
        this.liElement.dataset.id = this.id

        this.listName ||= document.createElement("a")
        this.listName.classList.add(..."block text-center font-medium py-4 col-span-6 text-xl".split(" "))
        this.listName.textContent = this.name

        this.editButton ||= document.createElement("button") 
        this.editButton.classList.add(..."focus:outline-none".split(" "))
        this.editButton.innerHTML = `<i class="far fa-edit"></i>`

        this.deleteButton ||= document.createElement("button")
        this.deleteButton.classList.add(..."float-right focus:outline-none".split(" "))
        this.deleteButton.innerHTML = `<i class="far fa-trash-alt"></i>`

        this.liElement.append(this.listName, this.editButton, this.deleteButton)
        this.constructor.wishListContainer().appendChild(this.liElement)

        // return this.liElement
        this.deleteButton.addEventListener("click", this.deleteWishList)
    }

    deleteWishList() {
        const wishListId = this.parentElement.dataset.id
    
        return fetch(`${wishListUrl}/${wishListId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            this.parentElement.remove()
        })
        
        // this.parentElement.remove()

        console.log("Delete button clicked!")
    }
    
}