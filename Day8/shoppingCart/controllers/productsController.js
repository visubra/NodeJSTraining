var Products = require("../model/products")
var productsArr = [
    { productId: 110, productName: "Jacket", price: 1500, quantity: 1, category: "Clothes" },
    { productId: 111, productName: "Cake", price: 450, quantity: 10, category: "Food" },
    { productId: 112, productName: "Necklace", price: 23000, quantity: 5, category: "Accessories" },
    { productId: 113, productName: "Polo Shirt", price: 740, quantity: 138, category: "Clothes" },
    { productId: 114, productName: "Watch", price: 11790, quantity: 367, category: "Accessories" },
    { productId: 115, productName: "Apple", price: 50, quantity: 999, category: "Food" },
    { productId: 116, productName: "Earring", price: 500, quantity: 164, category: "Accessories" },
]

function checkProduct(productId) {
    var pos = productsArr.findIndex(item => {
        return item.productId === parseInt(productId)
    })
    return pos
}

exports.getProducts = () => {
    return productsArr
}

exports.addProduct = (productObj) => {
    if (!productObj.productId) {
        return false
    } else {
        var pos = checkProduct(productObj.productId)
        if (pos >= 0) {
            console.log("Product ID already exists.")
            return false
        } else {
            productsArr.push(new Products(
                productObj.productId, 
                productObj.productName, 
                productObj.price, 
                productObj.quantity, 
                productObj.category
            ))
            return true
        }
    }
}

exports.updateProduct = (productObj) => {
    var pos = checkProduct(productObj.productId)
    if (pos >= 0) {
        productsArr[pos] = productObj
        return true
    } else {
        console.log("Product does not exist.")
        return false
    }
}

exports.deleteProduct = (productObj) => {
    var pos = checkProduct(productObj.productId)
    if (pos >= 0) {
        productsArr.splice(pos, 1)
        return true
    } else {
        console.log("Product does not exist.")
        return false
    }
}