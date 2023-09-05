const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name
        this.price = price
        items.push(this)
    }
    static findAll() {
        return items
    }
}

module.exports = Item;