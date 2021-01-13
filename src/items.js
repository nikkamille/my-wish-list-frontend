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
    
    static loadFromWishList(wishListId, items) {
        this.collection = items.map(item => new Item(item))
        let renderedItems = this.collection.map(item => item.renderItem())
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
        console.log("Working?")
    }

  









}