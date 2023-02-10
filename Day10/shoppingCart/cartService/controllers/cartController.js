const axios = require("axios")

var cartArr = []

function checkProduct(productId) {
    var pos = cartArr.findIndex(item => {
        return item.productId === parseInt(productId)
    })
    return pos
}

async function getAllProducts() {
    var serverUrl = "http://localhost:3000/products"
    var result = await axios.get(serverUrl)
        .then((res) => {
            console.log("Data from get req to /products: ", res.data)
            return res.data
        })
        .catch((err) => {
            // console.log("Error in get request to /products: ", err)
            return err
        })
    return result
}

exports.addItemsToCart = (cartObj) => {
    var pos = checkProduct(cartObj.productId)
    if (pos >= 0) {
        console.log("Product is already in cart.")
        return false
    } else {
        cartArr.push(cartObj)
        return true
    }
}

exports.removeItemsToCart = (itemsToBeDeleted) => {
    try {
        var itemsDeleted = []
        itemsToBeDeleted.forEach(item => {
            var pos = checkProduct(item.productId)
            if (pos >= 0) {
                itemsDeleted.push(cartArr[pos])
                cartArr.splice(pos, 1)
                // return true
            } else {
                console.log("Product does not exist.")
                // return false
            }
        })
        return { itemsDeleted }
    }
    catch (err) {
        return { err: err }
    }
}

exports.getAllCartItems = async () => {
    try {
        var productsArr = await getAllProducts()
        console.log("Products Arr: ", productsArr)
        var itemsAvailable = [], itemsUnAvailable = []
        cartArr.forEach(item => {
            var pos = productsArr.findIndex(product => product.productId == item.productId)
            if (pos >= 0) {
                if (item.quantity <= productsArr[pos].quantity) {
                    itemsAvailable.push(item)
                } else {
                    itemsUnAvailable.push(item)
                }
            }
        })
        // console.log("itemsAvailable", itemsAvailable)
        // console.log("itemsUnAvailable", itemsUnAvailable)
        return { itemsAvailable, itemsUnAvailable }
    }
    catch (err) {
        return { err: err }
    }
}

exports.updateItems = (finalisedItems, action) => {
    finalisedItems.forEach(item => {
        console.log("Item in cart: ", item)
        var serverUrl = "http://localhost:3000/products/" + item.productId

        axios.get(serverUrl)
            .then((res) => {
                var newQuantity = action === "confirm" ? res.data.quantity - item.quantity : res.data.quantity + item.quantity
                var newObj = { ...res.data, quantity: newQuantity }
                console.log("Updated product item: ", newObj)

                axios.put(serverUrl, newObj)
                    .then((res) => {
                        console.log("Response of the put: ", res.data)
                        //return res;
                    })
                    .catch((err) => {
                        console.log("Error in put request to /products: ", err)
                        //return err;
                    })
            })
            .catch((err) => {
                console.log("Error in get request to /products: ", err)
                //return err;
            })
    })
}

