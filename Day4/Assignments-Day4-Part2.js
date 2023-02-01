var fs=require("fs");
var path = require("path");
var orginalFolder="./MainFolder";
var cloneFolder="./MainFolder-Clone";
var shallowCloneFolder="./MainFolder-ShallowClone";

//Copy only Folder
fs.cp(orginalFolder, shallowCloneFolder, {recursive: false}, (err)=>{
    if(err){
        console.log(err);
    }else{
        if(fs.existsSync(shallowCloneFolder))
        {
            console.log("Folder copied and exists");
        }
    }
});

//Copy with Files
fs.cp(orginalFolder, cloneFolder, {recursive: true},(err)=>{
    if(err){
        console.log(err);
    }else{
        if(fs.existsSync(cloneFolder))
        {
            console.log("Folder copied and exists");
        }
    }
});