namespace Features.DL.Entities
{
    public class Expense: BaseModel
    {

        public virtual User User { get; set; }
        public virtual Frequency Frequency { get; set; }
        public virtual Boolean Paid {  get; set; }

        public virtual Decimal Value { get; set; }  
        public virtual string PaidTo { get; set; }

        public virtual UserPaymentMethod PaidVia { get; set; }

        public virtual ExpenseType ExpenseType { get; set; }

        public virtual ExpenseCategory ExpenseCategory { get; set; }
        public virtual string Description { get; set; }

        public virtual DateTime? PaidOn { get; set; }
    }
}
