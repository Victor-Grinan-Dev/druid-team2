//import { genId } from "../functions/genId";

export class SevProject {
  endDate = undefined; //when project is terminated
  customerContact = undefined; //array
  //startDate = undefined;
  //deadline = undefined;
  projectStatus = "Käynnissä"; //projectStatus "Käynnissä"
  services = []; //added by us

  constructor(name, customer, projectOwner) {
    this.name = name;
    this.customer = customer;
    this.projectOwner = projectOwner;
  }
}
