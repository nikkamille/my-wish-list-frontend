class Item {

    constructor(item) {
        this.id = item.id
        this.name = item.name
        this.price = item.price
        this.url = item.url
        this.image_url = item.image_url
        this.wish_list_id = item.wish_list_id
    }

    static itemContainer() {
        return this.item ||= document.getElementById("items-list")
    }
    
    static submitItem(formData) {
        event.preventDefault()

        const itemNameInput = formData.target.children[0].value
        const itemPriceInput = formData.target.children[1].value
        const itemUrlInput = formData.target.children[2].value
        const itemImageUrlInput = formData.target.children[3].value

        console.log(itemNameInput, itemPriceInput, itemUrlInput, itemImageUrlInput)
        
        // return fetch(itemsUrl, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     body: JSON.stringify({
        //         item: formData
        //     })
        // })
    }

    // static submitItem() {
    //     event.preventDefault()

    //     console.log("Item submitted! Chos!")

    //     const configObject = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name: itemNameInput.value,
    //             price: itemPriceInput.value,
                // url: itemUrlInput.value,
                // image_url: itemImageUrlInput.value
    //         })
    //             // name: this.name,
    //             // price: this.price, 
    //             // url: this.url,
    //             // image_url: this.image_url,
    //             // wish_list_id: this.wish_list_id
    //     }
        
    //     return fetch(itemsUrl, configObject)
    //     .then(res => res.json())
    //     .then(console.log)
        
    // }

    static loadFromWishList(wishListId, items) {
        this.collection = items.map(item => new Item(item))
        let renderedItems = this.collection.map(item => item.renderItem())
        this.itemContainer().innerHTML = ""
        this.itemContainer().append(...renderedItems)
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

        const br = document.createElement("BR")

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

        this.constructor.itemContainer().appendChild(this.liElement)

        return this.liElement
    }

  









}