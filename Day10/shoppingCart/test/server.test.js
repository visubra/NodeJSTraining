const chai = require("chai")
const chaiHttp = require("chai-http")
var app = require("../index")
const Products = require("../model/Products")

chai.use(chaiHttp)
chai.use(chai.should)

describe("get /products", () => {
    it("should return an array of products", (done) => {
        chai.request(app)
            .get("/products")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(7)
                done()
            })
    })
})

describe("put /products", () => {
    it("should update a product to the array of products", (done) => {
        var obj = new Products(110, "apple imac", 12345, 12, "laptop")
        chai.request(app)
            .put("/products/" + obj.productId)
            .send(obj)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('msg').eql(`Product updated successfully!`)
                done()
            })
    })
})

describe("delete /products", () => {
    it("should delete a product to the array of products", (done) => {
        var obj = new Products(110, "apple imac", 12345, 12, "laptop")
        chai.request(app)
            .delete("/products/" + obj.productId)
            .send(obj)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('msg').eql(`Product deleted successfully!`)
                done()
            })
    })
})