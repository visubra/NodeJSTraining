var fs = require('fs');
var sourcePath="./MainFolder/text1.txt";
var destPath="./MainFolder/text3.txt";

fs.copyFile(sourcePath, destPath, (err) => {
  if (err) {
    console.log("Failed to copy :", err);
  }
  else {    
    console.log("\nSuccessfully copied file");
       
  }
});