export class Invoice{ 
    
    isActive = false;
    isSent = false;
    isPaid = false;
    createdDateTime = undefined;
    
    constructor( guid, name, createdBy){
        this.guid = guid;
        this.referenceNumber = referenceNumber;
        this.customer = customer;
        this.project = project;
    }
}