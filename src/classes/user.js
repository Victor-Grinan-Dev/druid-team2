export class User{
    id = undefined;
    email = undefined;
    company = undefined;
    //password
    constructor(username, userType ){
        this.username = username;
        this.userType = userType;  
    }
}