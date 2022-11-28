import { genId } from "../functions/genId";

export class User {
  email = undefined;
  company = undefined;
  initials = undefined;
  pwd = undefined;
  bio = undefined;

  constructor(
    //token, 
    username,
    userType, //role (user, developer, pm cant create pms)
    firstName = undefined,
    lastName = undefined
  ) {
    //this.token = token;
    this.username = username;
    this.userType = userType;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = genId(24);
  }
}
