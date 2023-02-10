var express = require("express")
const morgan = require("morgan")
const path = require("path")
const fs = require("fs")
var productsController = require("../controllers/productsController")
const {validateToken}=require("../utils")

var router = express.Router()

// router.use(validateToken)

router.use((request,response,next) => {
    var wStream = fs.createWriteStream(path.join(request.rootDirName, "log", "serverLog.txt"), {flags: "a"})
    morgan("short", {stream:wStream})
    wStream.close()
    next()
})

router.get("/", (request, response, next) => {
    var result = productsController.getAllProducts()
    if (result) {
        response.status(200).send(result)
    } else {
        response.status(500).send({msg: "Cannot get products."})
    }
})

router.get("/:pId", (request, response, next) => {
    var productId = request.params.pId
    var result = productsController.getProduct(productId)
    if (result) {
        response.status(200).send(result)
    } else {
        response.status(202).send({msg: "Product not found."})
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

router.put("/:pId", (request, response, next) => {
    var productId = request.params.pId
    var result = productsController.updateProduct(productId, request.body)
    if (result) {
        response.status(200).send({msg: "Product updated successfully!"})
    } else {
        response.status(202).send({msg: "Product not found."})
    }
})

router.delete("/:pId", (request, response, next)=>{
    var result = productsController.deleteProduct(request.params.pId)
    if (result) {
        response.status(200).send({msg: "Product deleted successfully!"})
    } else {
        response.status(202).send({msg: "Product not found."})
    }
})

module.exports = router