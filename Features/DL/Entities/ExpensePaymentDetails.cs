namespace Features.DL.Entities
{
    public class ExpensePaymentDetails : BaseModel 
    {
        public virtual Expense Expense { get; set; }

        public virtual string CardName { get; set; } //HDFC, SBI, OneCard, Amex

        public virtual string CardType { get; set; }  //Debit, Credit

        public virtual string CardNumber { get; set; }

        public virtual DateOnly ExpiryDate { get; set; }

        public virtual int Cvv { get; set; }

        public virtual int AccountNumber { get; set; }

        public virtual string Ifsc { get; set; }

        public virtual float Amount { get; set; }

    }
}
