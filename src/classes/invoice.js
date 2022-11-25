export class Invoice { 
    status = "lähetetty";
    entryDate = undefined; //automatic generated value
    paymentTerm = 14; //days
    dueDate = undefined; // this.entryDate + this.paymentTerm
    paymentDate = undefined; //when customer have payed
    overdueInterest = 8.9;
    currency = undefined; // currency.symbol €, $, £
    totalIncludingTax = undefined; //totalIncludingTax.amount
    totalExcludingTax = undefined; //totalERxcludingTax.amount = undefined; //take away 24% from totalIncludingTax
    totalTax = undefined; //amount taken totalExcludingTax

    senderName = "Druid";

    constructor(guid, referenceNumber, customer, project){
        this.guid = guid;
        this.referenceNumber = referenceNumber;
        this.customer = customer;
        this.project = project;
    }
}