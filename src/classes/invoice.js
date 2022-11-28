export class Invoice{ 
    
    isActive = false;
    isSent = false;
    isPaid = false;
    createdDateTime = undefined;
    
    constructor( guid, name, createdBy){
        this.guid = guid;
        this.name = name;
        this.createdBy = createdBy;
        this.setCreatedTime();
    }
    setCreatedTime(){
        this.createdDateTime = new Date();
    }
};

