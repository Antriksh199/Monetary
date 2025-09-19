import { Base } from "../Base.js";
import { UserPaymentMethod } from "./UserPaymentMethod.js";

export class UserBank extends Base
{
    public uPaymentMethod?: UserPaymentMethod ;
    public bankName?: string;
    public accountType?: string;
    public accountNumber?: number;
    public Ifsc? : string;

}