/* Read from 3 files and add all the 
contents of 3 files into file4 using writeFile and readFile */

const fs=require("fs");
var myData, consolidatedData="";

for (let i = 1; i < 4; i++) {
        fs.readFile("./Files/File"+i+".txt",function(err,data){
        console.log("Reading Content of File " + i);
        if(err)
        {
            console.log("Error Reading Content of File " + i,err);
        }
        else
        {
            myData=data.toString()
            consolidatedData += myData + "\n";
            console.log("Content of File " + i + " : ", myData.toString());            
        }

        if(i == 3)
        {
        fs.writeFile("./Files/File_New.txt", consolidatedData,(err)=>{
    
            if(err)
            {
                console.log("Error Wtiting Content of File_New",err);
            }
            else
            {
                console.log("File Successfully Written to File_New");            
            }
        })
    }
  })
}

