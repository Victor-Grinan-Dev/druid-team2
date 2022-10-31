export class Project {
    id = undefined
    code = undefined
    developers = []
    status = undefined //progress, complete, pending
    //Service	Engine	Version	PHP	JS	Node	Drush	Omen	DBS	Mails	Search	CDN	Infra	Docker	Hosting	Deps	CI	dev & main

    service = []
    engine = []
    version = []
    php = []
    js = []
    node = []
    drush = []
    omen = []
    dbs = []
    mails = []
    search = []
    cdn = []
    infra = []
    docker = []
    hosting = []
    deps = []
    ci = []
    dev_n_main = []
    
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