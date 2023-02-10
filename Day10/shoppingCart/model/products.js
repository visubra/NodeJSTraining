class Products {
    productId
    productName
    price
    quantity
    category

    constructor(productId, productName, price, quantity, category) {
        this.productId = productId
        this.productName = productName
        this.price = price
        this.quantity = quantity
        this.category = category
    }

    setProductId(productId) {
        this.productId = productId
    }

    getProductId() {
        return this.productId
    }

    setProductName(productName) {
        this.productName = productName
    }

    getProductName() {
        return this.productName
    }

    setPrice(price) {
        this.price = price
    }

    getPrice() {
        return this.price
    }

    setQuantity(quantity) {
        this.quantity = quantity
    }

    getQuantity() {
        return this.quantity
    }

    setCategory(category) {
        this.category = category
    }

    getCategory() {
        return this.category
    }

}

module.exports = Products
