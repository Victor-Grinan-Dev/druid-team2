export class User {
  id = undefined;
  email = undefined;
  company = undefined;
  initials = undefined;
  pwd = undefined;
  bio = undefined;

  constructor(
    token,
    username,
    userType,
    firstName = undefined,
    lastName = undefined
  ) {
    this.token = token;
    this.username = username;
    this.userType = userType;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
