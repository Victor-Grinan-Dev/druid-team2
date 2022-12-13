
export class Service{

    services = [
    "CMS",
    "Engine",
    "Language",
    "Framework",
    "Libraries",
    "Database",
    "Mailing",
    "Search",
    "Cdn",
    "Infra",
    "Docker",
    "Hosting",
    "Deps",
    "CI_CD",
    ]

    constructor(id, service){
        this.id = id;
        this.service = service;
    }
}