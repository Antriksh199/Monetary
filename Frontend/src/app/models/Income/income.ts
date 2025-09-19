import { Base } from "../Base.js";
import { Frequency } from "../Admin/frequency.js";
import { IncomeType } from "../Admin/income-type.js";
import { User } from "../Admin/user.js";
import { UserPaymentMethod } from "../Admin/UserPaymentMethod.js";

export class Income extends Base {

        
        public user? : User;
        public source? : IncomeType;
        public frequency? : Frequency;
        public received? : boolean;
        public value? : number;
        public receivedFrom? : string;
        public receivedIn? : UserPaymentMethod;
        public description?: string;
        public receivedOn?: Date;

}