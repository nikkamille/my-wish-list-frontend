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
        // let items = items
        let renderedItems = items.map(item => item.renderItem())
        this.itemContainer().append(...renderedItems)
    }

  









}