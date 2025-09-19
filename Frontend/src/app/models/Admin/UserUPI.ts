import { Base } from "../Base.js";
import { UserPaymentMethod } from "./UserPaymentMethod.js";

export class UserUPI extends Base
{

    public uPaymentMethod?: UserPaymentMethod ;
    public upiId?: string;
}