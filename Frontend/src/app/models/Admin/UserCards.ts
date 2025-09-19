import { Base } from "../Base.js"
import { UserPaymentMethod } from "./UserPaymentMethod.js";

export class UserCards extends Base {
    
    public uPaymentMethod?: UserPaymentMethod ;
    public cardNumber?: number;
    public customerName? : string; //Name of Card Owner
    public provider?: string; //SBI, HDFC, AMEX
    public cvv?: number;
    public expiryDate?: string;
    public cardType?: string;

    transformDate(value: any)  {

        if(value)
        {
            const [datemonthstr, dateyearstr] = value.split("/");
            const year = parseInt(dateyearstr) + 2000;
            const month = parseInt(datemonthstr);
            const expiryDate = new Date(year, month, 0, 23, 59, 59 ); // 0th day of next month = last day of this month
            return expiryDate.toISOString().split('T')[0];
        }
        return ;
    }
    
}