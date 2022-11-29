import { genId } from "../functions/genId";

export class Project{ 
    //endDate  = undefined; //when project is terminated
    field_customer_contact = undefined; //array 
    //projectStatus = "Käynnissä" //projectStatus "Käynnissä"
    field_services = []//added by us

    type =  [
        {
          target_id: "project",
          target_type: "node_type",
        },
      ]

    constructor(name, customer){
        this.field_customer = [
            {
              value: customer,
              format: "plain_text",
            },
          ];

        this.title= [
            {
              value: name,
              
            },
          ];
    }
}
