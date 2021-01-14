class Item {

    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.price = item.price
        this.url = item.url
        this.image_url = item.image_url
        this.wish_list_id = item.wish_list_id
    }

    static itemListContainer() {
        return this.item ||= document.getElementById("items-list")
    }
    
    static submitItem(formData) {
        event.preventDefault()
        
        const itemNameInput = formData.target.children[0].value
        const itemPriceInput = formData.target.children[1].value
        const itemUrlInput = formData.target.children[2].value
        const itemImageUrlInput = formData.target.children[3].value
        const itemWishListId = formData.target.parentElement.children[0].children[0].dataset.id
        
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: itemNameInput,
                price: itemPriceInput, 
                url: itemUrlInput,
                image_url: itemImageUrlInput,
                wish_list_id: parseInt(itemWishListId)
            })
        }
        return fetch(itemsUrl, configObj)
        .then(res => res.json())
        .then(itemAttributes => {
            let newItem = new Item(itemAttributes)
            newItem.renderItem()
        })
        
    }
    
    static loadFromWishList(wishListId, items) {
        this.collection = items.map(item => new Item(item))
        let renderedItems = this.collection.map(item => item.renderItem())
        this.itemListContainer().innerHTML = ""
        this.itemListContainer().append(...renderedItems)
    }

    // <li class="grid-cols-12 border-2 rounded-md p-2 my-4">
    //     <img src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f310e626a911f4e432f6fb5%2F0x0.jpg" alt="Cellphone" width="500" height="600" class="mx-auto place-content-center m-2">
    //     <p class="text-center font-medium">Cellphone</p><br/>
    //     <p class="text-center font-medium -m-6">$900</p><br/>
    //     <a href="https://www.samsung.com/us/smartphones/the-next-galaxy/reserve/" class="block text-center font-medium text-blue-700 break-all">https://www.samsung.com/us/smartphones/the-next-galaxy/reserve/</a><br/>
    //     <button class="text-sm font-bold text-red-700 focus:outline-none">EDIT</button><br/>
    //     <button class="text-sm font-bold text-red-700 focus:outline-none">DELETE</button>
    // </li>

    renderItem() {
        this.liElement ||= document.createElement("li")
        this.liElement.classList.add(..."grid-cols-12 border-2 rounded-md p-2 my-4".split(" "))
        this.liElement.dataset.id = this.id

        this.image ||= document.createElement("img")
        this.image.src = this.image_url
        this.image.alt = this.name
        this.image.width = 600
        this.image.height = 400
        this.image.classList.add(..."mx-auto place-content-center m-2".split(" "))

        this.itemName ||= document.createElement("p")
        this.itemName.classList.add(..."text-center font-medium".split(" "))
        this.itemName.textContent = this.name

        this.itemPrice ||= document.createElement("p")
        this.itemPrice.classList.add(..."text-center font-medium -m-6".split(" "))
        this.itemPrice.textContent = "$" + this.price 

        this.itemLink ||= document.createElement("a")
        this.itemLink.href = this.url
        this.itemLink.textContent = this.url
        this.itemLink.classList.add(..."block text-center font-medium text-blue-700 break-all".split(" "))

        this.itemDeleteButton ||= document.createElement("button")
        this.itemDeleteButton.classList.add(..."text-sm font-bold text-red-700 p-1 focus:outline-none".split(" "))
        this.itemDeleteButton.innerHTML = "DELETE"

        this.liElement.append(this.image, this.itemName, this.itemPrice, this.itemLink, this.itemDeleteButton)
        this.liElement.insertBefore(document.createElement("br"), this.itemPrice)
        this.liElement.insertBefore(document.createElement("br"), this.itemLink)
        this.liElement.insertBefore(document.createElement("br"), this.itemDeleteButton)

        this.constructor.itemListContainer().appendChild(this.liElement)

        this.itemDeleteButton.addEventListener("click", this.deleteItem)

        return this.liElement
    }

    deleteItem() {
        // let confirmDelete = confirm("Are you sure you want to delete this item?")
        const itemId = this.parentElement.dataset.id
        console.log(this.parentElement)
        // if(confirmDelete) {
        //     fetch(`${itemsUrl}/${itemId}`)
        // }
    }


}