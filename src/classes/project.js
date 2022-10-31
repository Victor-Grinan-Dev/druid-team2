import { genId } from "../functions/genId";

export class Project {
    id = undefined;
    code = undefined
    developers = [];
    status = "started"; //started, progress, complete, pending
    
    service = [];
    engine = [];
    version = [];
    php = [];
    js = [];
    node = [];
    drush = [];
    omen = [];
    dbs = [];
    mails = [];
    search = [];
    cdn = [];
    infra = [];
    docker = [];
    hosting = [];
    deps = [];
    ci = [];
    dev_n_main = [];
    
    constructor(name, client ){
        this.name = name;
        this.client = client;

        this.code = genId();
    }

    addDev(newDev){
        this.dev.push(newDev);
    }
    changeStatus(newStatus){
        this.status = newStatus;
    }
}