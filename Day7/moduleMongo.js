const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017/"
const insertDoc = [
    {empId:201,empName:"Julie",salary:3456,deptId:"E1"},
    {empId:202,empName:"Ryan",salary:2366,deptId:"E1"},
    {empId:203,empName:"Kylie",salary:12456,deptId:"E2", "_id": 777},
    {empId:204,empName:"Cleo",salary:4569,deptId:"E3"},
    {empId:205,empName:"Via",salary:37800,deptId:"E2"},
]

const mongoClient = new MongoClient(uri, { useUnifiedTopology: true })

async function run() {
    try {
        var client = await mongoClient.connect()
        var dbName = client.db("dxcDB")
        var colName = dbName.collection("emp")

        colName.insertMany(insertDoc)
            .then((res) => {
                console.log("Inserted Ids: ", res.insertedIds)
                console.log("Inserted Count: ", res.insertedCount)
                mongoClient.close()
            })
            .catch((err) => {
                console.log("Number or emp inserted: ", err.result.insertedCount)
                console.log("Error on insertMany: ", err.writeErrors[0])
                mongoClient.close()
            })
    }
    catch (err) {
        console.log("Error: ", err)
    }
}

run()