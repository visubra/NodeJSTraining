const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017/"

const mongoClient = new MongoClient(uri, { useUnifiedTopology: true })

async function runDeleteOne() {
    try {
        var client = await mongoClient.connect()
        var dbName = client.db("dxcDB")
        var colName = dbName.collection("emp")

        var filterObj = {empId: 206}
        colName.deleteOne(filterObj)
            .then(res => {
                if (res.deletedCount > 0) {
                    console.log("Number of documents deleted: ", res.deletedCount)
                } else if (res.deletedCount === 0) {
                    console.log("No documents deleted.")
                }
                mongoClient.close()
            })
            .catch(err => {
                console.log("Error: ", err)
                mongoClient.close()
            })
    }
    catch (err) {
        console.log("Error: ", err)
    }
}

async function runDeleteMany() {
    try {
        var client = await mongoClient.connect()
        var dbName = client.db("dxcDB")
        var colName = dbName.collection("emp")

        var filterObj = {deptId: /^e/i}
        colName.deleteMany(filterObj)
            .then(res => {
                if (res.deletedCount > 0) {
                    console.log("Number of documents deleted: ", res.deletedCount)
                } else if (res.deletedCount === 0) {
                    console.log("No documents deleted.")
                }
                mongoClient.close()
            })
            .catch(err => {
                console.log("Error: ", err)
                mongoClient.close()
            })
    }
    catch (err) {
        console.log("Error: ", err)
    }
}

runDeleteMany()