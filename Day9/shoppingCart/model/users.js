class Users
{
    userName;
    password;
    constructor(userName,password)
    {
        this.password=password;
        this.userName=userName
    }

    setUser(userName,password)
    {
        this.password=password;
        this.userName=userName
    }
    getUser(userName)
    {
        return this.password;
    }

}
module.exports=Users;
