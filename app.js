const express = require('express')
const app = express()
const it = require('./fakeDb')
const itemsRoutes = require('./routes/items')
const ExpressError = require('./expressError')

app.use(express.json())
app.use("/items", itemsRoutes) // http://localhost:3000/items

// 404 Handler
app.use(function(req, res, next) {
    throw new ExpressError("Page Not Found!", 404)
})

// General Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        error: err.message
    })
})

module.exports = app