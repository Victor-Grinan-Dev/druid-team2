import { genId } from "../functions/genId";

export class User {
  email = undefined;
  company = undefined;
  initials = undefined;
  pwd = undefined;
  bio = undefined;
  firstName = undefined;
  lastName = undefined;

  constructor(
    token, 
    username,
    userType, //role (user, developer, pm cant create pms)
  ) {
    this.token = token;
    this.username = username;
    this.userType = userType;
    this.id = genId(24);
  }
}
