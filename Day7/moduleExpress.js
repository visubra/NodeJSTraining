const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const fs = require("fs")

const port = 3000
var productArr = [
    { productId: 110, productName: "Jacket", price: 1500, quantity: 1, category: "Clothes" },
    { productId: 111, productName: "Cake", price: 450, quantity: 10, category: "Food" },
    { productId: 112, productName: "Necklace", price: 23000, quantity: 5, category: "Accessories" },
    { productId: 113, productName: "Polo Shirt", price: 740, quantity: 138, category: "Clothes" },
    { productId: 114, productName: "Watch", price: 11790, quantity: 367, category: "Accessories" },
    { productId: 115, productName: "Apple", price: 50, quantity: 999, category: "Food" },
    { productId: 116, productName: "Earring", price: 500, quantity: 164, category: "Accessories" },
]
var logStream = fs.createWriteStream(path.join(__dirname, "log", "productLogs.txt"), {flags: "a"})

var app = express()

app.use(morgan('combined', {stream: logStream}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// get all
app.get("/products", (request, response) => {
    response.status(200).send(productArr)
})

// get by product id
app.get("/product?", (request, response) => {
    var req = request.query
    var key = Object.keys(req)
    if (key.length === 0) {
        response.status(500).send("Invalid parameter.")
    } else if (key.length === 1 && key[0] === "productId") {
        var pos = productArr.findIndex(item => {
            return item.productId === parseInt(req.productId)
        })
        if (pos >= 0) {
            response.status(200).send(productArr[pos])
        } else {
            response.status(404).send("Product not found.")
        }
    } else {
        response.status(500).send("Can only search by Product ID.")
    }
})

// add product
app.post("/products", (request, response) => {
    var pos = productArr.findIndex(item => {
        return item.productId === parseInt(request.body.productId)
    })
    if (pos >= 0) {
        response.status(500).send("Product ID already exists.")
    } else {
        productArr.push(request.body)
        response.status(200).send("Product added successfully.")
    }
})

// update by product id
app.put("/products", (request, response) => {
    var body = request.body
    var productObj = productArr.find(item => {
        return item.productId === parseInt(body.productId)
    })
    if (productObj) {
        productObj.productName = body.productName
        productObj.price = body.price
        productObj.quantity = body.quantity
        productObj.category = body.category
        response.status(200).send(`Product updated successfully. Updated data: ${JSON.stringify(productArr)}`)
    } else {
        response.status(404).send("Product not found.")
    }
})

// delete by product id
app.delete("/products", (request, response) => {
    var pos = productArr.findIndex(item => {
        return item.productId === parseInt(request.body.productId)
    })
    if (pos >= 0) {
        productArr.splice(pos, 1)
        response.status(200).send(`Product deleted successfully. Updated data: ${JSON.stringify(productArr)}`)
    } else {
        response.status(404).send("Product not found.")
    }
})

app.all("/", (request, response) => {
    response.send("Response from the server")
})

app.listen(port, ()=> {
    console.log(`Server started at port: ${port}`)
})
