import { UserCards } from "./UserCards.js";
import { UserBank } from "./UserBanks.js";
import { UserUPI } from "./UserUPI.js";
import { UserCash } from "./UserCash.js";

export class UserPaymentMethodWrapper {
    public cards: UserCards[] = [];
    public banks: UserBank[] = [];
    public upis: UserUPI[] = [];
    public cash: UserCash[] = [];
}