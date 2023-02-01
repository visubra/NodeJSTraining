/**Square of 2 Numbers**/
function squareAnArray(arr)
{
    var rsarr=[];
    for(let i=0;i<arr.length;i++)
    {
        rsarr.push(arr[i]*arr[i]);
    }
    return rsarr;
}

/**Get Highest Salary**/
function getHighestSalary(arrOfObj)
{
    var pos=0;
    for(let i=0;i<(arrOfObj.length-1);i++)
    {
        if (arrOfObj[i]["salary"] > arrOfObj[pos]["salary"] )
        {
            pos=i;
        }
    }    
    return arrOfObj[pos];;
}

function maskPhoneNumber(phoneNumber, unmaskedCharCount)
{
    var regex = /\d/g;
    var maskedphNo="";
    var strPhNo=phoneNumber.toString();
    var firstSet= strPhNo.substring(0,unmaskedCharCount);
    var maskSet= strPhNo.substring(unmaskedCharCount,strPhNo.length - unmaskedCharCount);
    var secondSet= strPhNo.substring(strPhNo.length - unmaskedCharCount,strPhNo.length);
    var maskString ='*';
    maskedphNo =  strPhNo.replace(maskSet,maskSet.replace(regex,'*')) ;
    return maskedphNo;
}



var arr=[10,20,30,40,50];
var empArr=[{empId:101,empName:"Karthick",salary:100100,deptId:"D1"},
            {empId:102,empName:"Ganesh",salary:2000,deptId:"D1"},
            {empId:103,empName:"Vikram",salary:2000,deptId:"D2"},
            {empId:104,empName:"Boopathi",salary:100200,deptId:"D1"},
            {empId:105,empName:"Ram",salary:3500,deptId:"D2"}]

//first quastion
console.log("Square Value of the Input Array is ==> "+squareAnArray(arr));
console.log("");
//second question
var res=maskPhoneNumber(1234567890, 3);
console.log("Masked Phone Number is ==> "+res);
console.log("");

//third question
var obj=getHighestSalary(empArr);
console.log("Highest Salary Employee is ==> ")
console.log("Employee Id : "+obj.empId);
console.log("Employee Name : "+obj.empName);
console.log("Employee Salary : "+obj.salary);
console.log("Employee Department Id : "+obj.deptId);
console.log("");
