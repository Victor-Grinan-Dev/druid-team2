
export class Service{

    engine = "Drupal";
    version = "9.4";
    php = "8.0";
    node =  "16";
    js = "webpack";
    drush = "Mailjet";
    omen = "Solr";
    dbs = "8";
    mails = "11";
    search = "MariaDB";
    cdn = "CloudFron";
    infra = "-";
    docker = "uselagoon";
    hosting = "Lagoon";
    deps = "Renovate";
    ci = "GHA";
    dev_n_main = "X";

    constructor(id, service){
        this.id = id;
        this.service = service;
    }
}