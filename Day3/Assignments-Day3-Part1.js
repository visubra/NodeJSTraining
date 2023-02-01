/*
Part 1
*/

//Remove Employee
function removeEmployee(empArr,pos){
    
    if(empArr.length > 0 && pos >= 0)
    {
        empArr.splice(pos-1, 1);
        //console.log(JSON.stringify(empArr, "No Data Found",1));
    }
    return empArr;

}

function addEmployee(tmpArr, employeeObj, pos){
    
    if(tmpArr.length > 0 && pos >= 0)
    {
        tmpArr.splice(pos-1, 0, employeeObj);
        //console.log(JSON.stringify(tmpArr, "No Data Found",1));
    }
    return tmpArr;

}

function fetchEmployeeRecord(tmpArr, id){
    
    if(empArr.length > 0)
    {
       return tmpArr.find(item => item.empId == id);
    }
    else
    {
        return null;
    } 

}

function findPositionOnList(tmpArr, salary){
    
    if(empArr.length > 0)
    {
       return tmpArr.findIndex(item => item.salary == salary);
    }
    else
    {
        return null;
    } 

}
var empArr=[{empId:101,empName:"Asha",salary:100100,deptId:"D1"},
            {empId:102,empName:"Gaurav",salary:2000,deptId:"D1"},
            {empId:103,empName:"Karan",salary:2000,deptId:"D2"},
            {empId:104,empName:"Kishan",salary:100300,deptId:"D1"},
            {empId:105,empName:"Keshav",salary:3500,deptId:"D2"},
            {empId:106,empName:"Pran",salary:4000,deptId:"D3"},
            {empId:107,empName:"Saurav",salary:3800,deptId:"D3"}];
        
var pos=3;

var tempArr = removeEmployee(empArr.slice(),pos);
if(tempArr.length == empArr.length-1)
{
    console.log("Successfully removed Employee from an array");

}else{
    console.log("Failed to remove Employee from an array");
}

pos=6;
var emp={empId:108,empName:"Vignesh",salary:200100,deptId:"E1"};
        
tempArr = addEmployee(empArr.slice(),emp,pos);
if(tempArr.length == empArr.length+1)
{
    console.log("Successfully added Employee to an array");

}else{
    console.log("Failed to add Employee to an array");
}


var emp=null;
        
emp = fetchEmployeeRecord(empArr.slice(),104);
if(emp != undefined && emp != null)
{
    console.log(JSON.stringify(emp, 0, 0));

}else{
    console.log("Failed to fetch record");
}


var emp=null;
        
emp = findPositionOnList(empArr.slice(),100300);
if(emp != undefined && emp != null && emp >= 0)
{
    console.log("Record Position is "+ (emp + 1) + " in the Array");

}else{
    console.log("Failed to fetch index");
}