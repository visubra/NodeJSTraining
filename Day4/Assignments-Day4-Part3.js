const fs = require('fs');


function doesFileExist(path)
{
if (fs.existsSync(path)) {
  return true;
} else {
  return false;
}
}

var rs=doesFileExist("./MainFolder/text1.txt");
if(rs==true)
{
    console.log("File is Exist.........");
}else{
    console.log("file is not exist.........");
}
 
