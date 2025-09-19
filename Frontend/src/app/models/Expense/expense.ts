
import { Base } from "../Base.js";
import { Frequency } from "../Admin/frequency.js";
import { User } from "../Admin/user.js";
import { UserPaymentMethod } from "../Admin/UserPaymentMethod.js";
import { ExpenseCategory } from "../Admin/ExpenseCategory.js";
import { ExpenseType } from "../Admin/ExpenseType.js";

export class Expense extends Base 
{   
    public user? : User;
    public frequency? : Frequency;
    public paid? : boolean;
    public value? : number;
    public paidTo? : string;
    public paidVia? : UserPaymentMethod;
    public description?: string;
    public expenseType?: ExpenseType;
    public expenseCategory?: ExpenseCategory;
    public paidOn? : Date;

}