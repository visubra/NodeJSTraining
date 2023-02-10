var Users=require("../model/users");
var usersArr=[
    {userName:'sara',password:'sara'}
];
function checkUser(userName,password)
{
    var pos=usersArr.findIndex(user => user.userName == userName && user.password ==password);
    if(pos >=0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function addUser(userName,password)
{
    if(checkUser(userName,password))
    {
        return false;
    }
    else
    {
        usersArr.push(new Users(userName,password));
        return true;
    }
}

module.exports={addUser,checkUser}