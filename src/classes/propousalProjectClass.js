export class PropProject{
    guid = undefined;
    name = undefined;
    projectStatus = new Object;
}

const projectStatus = {
    guid : undefined,
    name : undefined,
    description : null,
    projectStatusTypeGuid : undefined
}

export class SevProject {

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