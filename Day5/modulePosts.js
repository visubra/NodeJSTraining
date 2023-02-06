var http = require("http");//core inbuilt module
var fs = require("fs");//core inbuilt module
var path = require("path");//core inbuilt module
var url=require("url");//core inbuilt module
var qs=require("querystring");//core inbuilt module

const port=3000;
var postsArr=[];

var server=http.createServer((request,response)=>{
    /*-----START OF ASSIGNMENT-----*/
    var urlObj = url.parse(request.url)
    
    if (request.url === "/posts" || urlObj.pathname === "/posts")
    {
        if (request.method === "DELETE") {
            var postsToBeDeleted = ""
            request.on("data", (chunks) => {
                postsToBeDeleted += chunks
            })
            request.on("end", () => {
                var postsToBeDeletedObj = JSON.parse(postsToBeDeleted)
                var pos = postsArr.findIndex(item => item.postsName === postsToBeDeletedObj.postsName)
                if (pos >= 0) {
                    postsArr.splice(pos, 1)
                    response.end(JSON.stringify({msg: "Data deleted successfully.", updatedData: postsArr}))
                }
                else {
                    response.statusCode = 404
                    response.end(JSON.stringify({err: "Posts to delete does not exist."}))
                }
            })
            request.on("errors", (err) => {
                response.statusCode = 500
                response.end(JSON.stringify({err: err}))
            })
            return
        }
        else if (request.method === "GET")
        {
            if (urlObj.search) {
                var qsObj = qs.parse(urlObj.query)
                if (!qsObj.postsName) {
                    response.statusCode = 500
                    response.end(JSON.stringify({err: "Invalid parameter."}))
                } else {
                    var pos = postsArr.findIndex(item => item.postsName === qsObj.postsName)
                    if (pos >= 0) {
                        response.end(JSON.stringify(postsArr[pos]))
                    }
                    else {
                        response.statusCode = 404
                        response.end(JSON.stringify({err: "Posts does not exist."}))
                    }
                }
                return
            } else {
                // select query
                response.end(JSON.stringify(postsArr))
            }
            return
        }
        /*-----END OF ASSIGNMENT-----*/

        else if(request.method =="PATCH")
        {
            // update an existing record
            //data as part of body section
            var postsToBeUpdated="";
            request.on("data",(chunks)=>{
                postsToBeUpdated+=chunks;
            })
            request.on("end",()=>{
                var postsToBeUpdatedObj=JSON.parse(postsToBeUpdated);
                var pos=postsArr.findIndex(item => item.postsName == postsToBeUpdatedObj.postsName)
                if(pos >= 0)
                {
                    postsArr[pos].status=postsToBeUpdatedObj.status;
                    response.end(JSON.stringify({msg:"Data updated successfully",updatedData:postsArr[pos]}));
                }
                else
                {
                    response.statusCode=401;
                    response.end(JSON.stringify({err:"Posts does not exists to update"}));
                }
            })
            request.on("errors",(err)=>{
                response.statusCode=500;
                response.end(JSON.stringify({err:err}));
            })
            return;
        }
        else if(request.method == "POST")
        {
            // data is coming in the body section of request
            //insert a new record
            var newPosts="";
            request.on("data",(chunks)=>{
                newPosts+=chunks;
            })
            request.on("end",()=>{
                var newPostsObj=JSON.parse(newPosts);
                var pos=postsArr.findIndex(item => item.postsName == newPostsObj.postsName);
                // pos =-1 if not found or post-0 or positive number if exists
                if(pos ==-1)
                {
                    postsArr.push(newPostsObj);// sync method
                    response.end(JSON.stringify({msg:"New Posts created "}));

                }
                else
                {
                    response.statusCode=401;
                    response.end(JSON.stringify({err:"Posts already exists with the given name"}));
                }
                
              
            })
            request.on("errors",(err)=>{
                // Insertion has failed
                console.log("Error in post request to /posts",err);
                response.statusCode=401;
                response.end(JSON.stringify({err:"Insertion failed"}));
                
            })
            return;

        }
        
    }
    response.end("Unknown Path Detected");
})

server.listen(port,()=>{
    console.log(`Server is started at ${port}`);
})




