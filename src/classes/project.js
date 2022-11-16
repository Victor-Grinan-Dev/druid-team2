import { genId } from "../functions/genId";
import { Service } from "./service";

export class SevProject {
    guid = undefined;
    name = undefined;
    projectStatus = {
        guid : undefined,
        name : undefined,
        description : null,
        projectStatusTypeGuid : undefined
    };
    isInternal = false;
    internalName = undefined;
    number = null;
    description = null;
    isClosed = false;
    closedDate = null;
    isJoiningAllowed = true;
    customer = {
        guid: undefined,
        name: undefined,
        number: null
    };
    projectOwner = {
        guid : undefined,
        name : undefined,
        firstName : undefined,
        lastName : undefined,
        code : null
    };
    businessUnit = {
        guid : undefined,
        name : undefined,
        companyGuid : undefined,
        companyName : undefined,
        companyBusinessUnitGuid : null,
        companyCountryGuid : undefined,
        companyCurrencyGuid : undefined,
        code : null
    };
    currency = {
        guid : "3c80ec40-d3f1-35cb-5916-fd84b3c730e7",
        name : "Euros",
        code : "EUR",
        symbol : "€"
    };
    customerContact = {
        guid : undefined,
        name : undefined,
        firstName : undefined,
        lastName : undefined,
        isDeleted : false
    };
    salesStatus = {
        guid : undefined,
        name : undefined,
        salesStatusTypeGuid : undefined
    };
    salesPerson = {
        guid : undefined,
        name : undefined,
        firstName : undefined,
        lastName : undefined,
        code : null
    };
    probability = null;
    expectedOrderDate = undefined;
    expectedValue = {
        amount : null,
        currencyCode : "EUR",
        multiCurrencyInfo : null
    };
    startDate = undefined;
    deadline = null;
    leadSource = null;
    rootPhase = {
        guid : undefined,
        name : undefined
    };
    pricelist = {
        guid : undefined,
        name : undefined,
        isCustom : false,
        isVolumePricing : false
    };
    costCenter = null;
    paymentTerm = 14;
    ourReference = null;
    yourReference = null;
    orderNumber = null;
    invoiceNotes = null;
    billingContact = null;
    invoiceTemplate = {
        guid : undefined,
        name : undefined,
        templateInvoiceGuid : null
    };
    useWorkTypesFromSetting = false;
    defaultWorkType = {
        guid : undefined,
        name : undefined
    };
    useProductsFromSetting = false;
    isMileageBillable = false;
    isDailyAllowanceBillable = false;
    isOtherTravelExpensesBillable = false;
    useOvertimeMultipliers = false;
    keywords = null;
    completionEstimatePercentage = null;
    calculatedCompletionPercentage = null;
    createdDateTime = undefined;
    createdBy = {
        guid : undefined,
        name : undefined,
        firstName : undefined,
        lastName : undefined,
        code : null
    };
    lastUpdatedDateTime = undefined;
    lastUpdatedBy = {
        guid : undefined,
        name : undefined,
        firstName : undefined,
        lastName : undefined,
        code : null
    }
};

export class Project {
    id = undefined;
    code = undefined
    developers = [];
    status = "started"; //started, progress, complete, pending
    services = [];

    constructor( name, customer ){
        this.name = name;
        this.customer = customer;
        this.code = genId();
        this.services.push(new Service("1", "url1"))
    }

    addDev(newDev){
        this.dev.push(newDev);
    }
    changeStatus(newStatus){
        this.status = newStatus;
    }
}
/**** to add maybe ? ****/
//guid 8 - 4 - 4 - 4 - 12
//projectStatus {guid, name: Käynnissä}
//


/*
"customer": {
            "guid": "d24d00d4-b34b-0150-e769-39a135bbed65",
            "name": "Tonin työpaja",
            "number": 1002
        },
*/

/*
we could add customer conctact to projectInfo (many?)
"customerContact": {
            "guid": "110c0027-2bf8-daaa-12c3-c11e45cc2194",
            "name": "Toni Työmies",
            "firstName": "Toni",
            "lastName": "Työmies",
            "isDeleted": false
        },
*/

/* all user have their own account, a customer can have many different users 


part of the data
no need to have exact json struct
 matching drupal fields 

 drupal pull from severa

 project must be enriched 
 use identifier to invoiced

 use the identifiers 

 question from jere:
 mikko: project manager has preffernce on his own project but has acces to all projects

 ping markos and mikko to get one hour of consultancy
*/