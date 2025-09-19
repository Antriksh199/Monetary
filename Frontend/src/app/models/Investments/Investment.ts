
import { Base } from "../Base.js";
import { Frequency } from "../Admin/frequency.js";
import { User } from "../Admin/user.js";
import { UserPaymentMethod } from "../Admin/UserPaymentMethod.js";
import { InvestmentCategory } from "../Admin/InvestmentCategory.js";
import { InvestmentType } from "../Admin/InvestmentType.js";

export class Investment extends Base 
{   
    public user? : User;
    public frequency? : Frequency;
    public invested? : boolean;
    public value? : number;
    public investedTo? : string;
    public investedVia? : UserPaymentMethod;
    public description?: string;
    public investmentType?: InvestmentType;
    public investmentCategory?: InvestmentCategory;
    public investedOn? : Date;
    public tenure?: number;
    public growthRate?: number;

}