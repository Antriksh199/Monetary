import { Base } from "../Base.js";
import { PaymentMethod } from "./PaymentMethod.js";
import { UserBank } from "./UserBanks.js";
import { UserCards } from "./UserCards.js";
import { UserUPI } from "./UserUPI.js";
import { User } from "./user.js";


export class UserPaymentMethod extends Base
{
    public paymentMethod ?: PaymentMethod;
    public user? : User;
}