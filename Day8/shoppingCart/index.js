const express=require("express");//module to be installed
const path=require("path");
const bodyParser=require("body-parser");//module to be installed

const morgan=require("morgan");//module to be installed
// logging of the requests -- morgan

const productsRouter=require("./routes/products.routes");
const usersRouter=require("./routes/users.routes");

const fs=require("fs");

const port=3000;
var wStream=fs.createWriteStream(path.join(__dirname,"log","serverLog.txt"),{flags:"a"});


var app=express();

app.use(morgan("combined",{stream:wStream}));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public","images")));

app.use((request,response,next)=>{
    request.rootDirName=__dirname;
    next();
})

app.use("/products",productsRouter);
app.use("/users",usersRouter)

console.log("Express example");
app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})