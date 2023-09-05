process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require('../app')
let items = require('../fakeDb')

let popsicle = {name: "Popsicle", price: 1.45}
let cheerios = {name: "Cheerios", price: 3.40}

beforeEach(function() {
    items.push(popsicle)
})

afterEach(function() {
    items.length = 1
})