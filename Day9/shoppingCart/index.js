require("dotenv").config();
const express=require("express");//module to be installed
const path=require("path");
const bodyParser=require("body-parser");//module to be installed
var hbs=require("hbs");

const morgan=require("morgan");//module to be installed
// logging of the requests -- morgan

const productsRouter=require("./routes/products.routes");
const usersRouter=require("./routes/users.routes");
const employeesRouter=require("./routes/employees.routes")

const productsController=require("./controllers/productsController")

const fs=require("fs");

const {validateToken}=require("./utils");

const port=3000;
var wStream=fs.createWriteStream(path.join(__dirname,"log","serverLog.txt"),{flags:"a"});

//add some helpers to the views
hbs.registerHelper("upper",(str)=>{
    return str.toUpperCase();
})

hbs.registerHelper("map",(arr,options)=>{
    var liArr=arr.map(item=>{
        return "<li>"+options.fn(item) +"</li>"
   
    })
    return "<ul>"+liArr.join("\n")+"</ul>"
})

var app=express();
// change the default view engine from (jade ) to hbs
app.set("view engine",'hbs')
/* 
// If the template files are present in any other folder other than "views"
app.set("views",path.join(__dirname,"myViews"))
 */
app.use(morgan("combined",{stream:wStream}));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public","images")));



app.use((request,response,next)=>{
    request.rootDirName=__dirname;
    next();
})
app.use("/users",usersRouter)

//add a custom middleware

app.use("/products",productsRouter);
app.use("/employees",employeesRouter)
app.get("/home",(request,response)=>{
    // render some static content
    response.render('home');
})

app.get("/about",(request,response)=>{
    response.render("about",{companyDetails:{companyName:"DXC",country:"India"}})
})  
app.get("/productDetails",(request,response)=>{
    response.render("productDetails",{productsArr:productsController.getAllProducts()})
})
console.log("Express example");
app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})