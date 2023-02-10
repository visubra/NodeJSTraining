var express = require("express")
const morgan = require("morgan")
const path = require("path")
const fs = require("fs")
var productsController = require("../controllers/productsController")

var router = express.Router()

router.use((request,response,next) => {
    var wStream = fs.createWriteStream(path.join(request.rootDirName, "log", "serverLog.txt"), {flags: "a"})
    morgan("short", {stream:wStream})
    wStream.close()
    next()
})

router.get("/", (request, response, next) => {
    var result = productsController.getProducts()
    if (result) {
        response.status(200).send(result)
    } else {
        response.status(500).send({msg: "Cannot get products."})
    }
})

router.post("/", (request, response, next) => {
    var result = productsController.addProduct(request.body)
    if (result) {
        response.status(200).send({msg: "Product added successfully!"})
    } else {
        response.status(500).send({msg: "Cannot add product."})
    }
})

router.put("/", (request, response, next) => {
    var result = productsController.updateProduct(request.body)
    if (result) {
        response.status(200).send({msg: "Product updated successfully!"})
    } else {
        response.status(404).send({msg: "Product not found."})
    }
})

router.delete("/", (request, response, next)=>{
    var result = productsController.deleteProduct(request.body)
    if (result) {
        response.status(200).send({msg: "Product deleted successfully!"})
    } else {
        response.status(404).send({msg: "Product not found."})
    }
})

module.exports = router



