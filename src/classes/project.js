import { genId } from "../functions/genId";
import { Service } from "./service";

export class Project {
    id = undefined;
    code = undefined
    developers = [];
    status = "started"; //started, progress, complete, pending
    services = [];

    constructor(name, client ){
        this.name = name;
        this.client = client;

        this.code = genId();
        this.services.push(new Service("url1"))
    }

    addDev(newDev){
        this.dev.push(newDev);
    }
    changeStatus(newStatus){
        this.status = newStatus;
    }
}