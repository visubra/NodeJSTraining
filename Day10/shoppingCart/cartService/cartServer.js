require("dotenv").config();
const express=require("express");//module to be installed
const path=require("path");
const bodyParser=require("body-parser");//module to be installed
var hbs=require("hbs");

const morgan=require("morgan");//module to be installed
// logging of the requests -- morgan
const cartRouter=require("./routes/carts.routes")

const fs=require("fs");


const port=3001;
var app=express();
// change the default view engine from (jade ) to hbs
app.set("view engine",'hbs')
/* 
// If the template files are present in any other folder other than "views"
app.set("views",path.join(__dirname,"myViews"))
 */
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public","images")));

app.use("/cart",cartRouter);


console.log("Express example");
app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})