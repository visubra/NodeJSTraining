var express = require("express")
var cartController=require("../controllers/cartController")

const router = express.Router()

router.get("/", async (request, response) => {
    var data = await cartController.getAllCartItems()
    if (!data.err) {
        response.status(200).send(data)   
    } else {
        console.log(data.err)
        response.status(500).send({err: `${data.err}`})
    }
})

router.post("/", (req, res) => {
    var cartItemToBeAdded = req.body
    var result = cartController.addItemsToCart(cartItemToBeAdded)
    if (result) {
        res.status(200).send({msg: "Item added successfully"})
    } else {
        res.status(202).send({msg: "Not able to add"})
    }
})

router.post("/confirm", async (req, res) => {
    var finalisedItems = req.body
    if (finalisedItems && finalisedItems.length) {
        await cartController.updateItems(finalisedItems, "confirm")
        res.status(200).send({msg: "Data updated successfully"})
    } else {
        res.status(202).send({msg: "Cart is empty"})
    }
})

router.post("/cancel", async (req, res) => {
    var finalisedItems = req.body
    if (finalisedItems && finalisedItems.length) {
        await cartController.updateItems(finalisedItems, "cancel")
        res.status(200).send({msg: "Data updated successfully"})
    } else {
        res.status(202).send({msg: "Cart is empty"})
    }
})

router.delete("/", async (req, res) => {
    var itemsToBeDeleted = req.body
    var result = cartController.removeItemsToCart(itemsToBeDeleted)
    if (!result.err) {
        res.status(200).send(result)
    } else {
        res.status(500).send({err: `${result.err}`})
    }
})

module.exports = router