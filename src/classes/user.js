export class User{
    id = undefined;
    email = undefined;
    company = undefined;
    initials = undefined;

    constructor(username, userType, firstName=undefined, lastName=undefined ){
        this.username = username;
        this.userType = userType; 
        this.firstName = firstName;
        this.lastName = lastName;
        this.setInitials();
    }

    setInitials(){
        if(this.firstName && this.lastName){
            this.initials = [firstName.splice(0)[0].toUpperCase(), lastName.splice(0)[0].toUpperCase()].join()
        }
        else {
            this.initials = username.splice(2)[0];
        }
    }
}