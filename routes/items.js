const Item = require('../item')
const items = require('../fakeDb')
const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')

router.get("/", function(req, res, next) {
    // console.log("Hello World")
    return res.json({ items: Item.findAll() })
})

router.post("/", function(req, res) {
    const newItem = { name: req.body.name, 
                      price: req.body.price }
    items.push(newItem)
    res.status(201).json({ item: newItem })
})

router.get("/:name", function(req, res) {
    const foundItem = items.find(item => 
        item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("Item Not Found", 404)
    }
    res.json({ item: foundItem })
})

router.patch("/:name", function(req, res) {
    const itemIndex = items.findIndex(item =>
        item.name === req.params.name)
    if (itemIndex === -1) {
        throw new ExpressError("Item Not Found", 404)
    }
    if (req.body.name) {
        items[itemIndex].name = req.body.name
    } 
    if (req.body.price) {
        items[itemIndex].price = req.body.price
    }
    return res.json({message: "Adjustments have been made.",
                     item: {
                        name: req.body.name,
                        price: req.body.price
                     }})
})

router.delete("/:name", function(req, res) {
    const itemIndex = items.findIndex(item => 
        item.name === req.params.name)
    if (itemIndex === -1) {
        throw new ExpressError("Item Not Found.", 404)
    }
    items.splice(itemIndex, 1)
    return res.json({message: `Removed ${req.params.name} from shopping list.`})
})

module.exports = router