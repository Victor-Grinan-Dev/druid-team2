import { genId } from "../functions/genId";

export class SevProject {
  endDate = undefined; //when project is terminated
  customerContact = undefined; //array
  //startDate = undefined;
  //deadline = undefined;
  projectStatus = "Käynnissä"; //projectStatus "Käynnissä"
  services = []; //added by us

  constructor(name, company, projectOwner) {
    this.name = name;
    this.company = company;
    this.projectOwner = projectOwner;
  }
}
