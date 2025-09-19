import { UserCards } from "./UserCards.js";
import { UserBank } from "./UserBanks.js";
import { UserCash } from "./UserCash.js";
import { UserUPI } from "./UserUPI.js";

export class AddUserPayment
{
public PaymentMethod?: string;
public card?: UserCards;
public bank?: UserBank;
public upi? : UserUPI;
public cash?: UserCash;

constructor(card?: UserCards, bank?: UserBank, upi?: UserUPI, cash?: UserCash)
{
    this.card = card;
    this.bank = bank;
    this.cash = cash;
    this.upi = upi
}

}