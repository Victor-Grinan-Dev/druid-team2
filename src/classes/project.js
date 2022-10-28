export class Project {
    id = undefined
    code = undefined
    developers = []
    status = undefined //progress, complete, pending

    constructor(name, client ){
        this.name = name
        this.client = client
    }

    addDev(newDev){
        this.dev.push(newDev);
    }
    changeStatus(newStatus){
        this.status = newStatus;
    }
}