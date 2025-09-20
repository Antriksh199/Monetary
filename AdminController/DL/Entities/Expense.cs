namespace AdminController.DL.Entities
{
    public class Expense: BaseModel
    {
        public virtual string name { get; set; }
        public virtual string description { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }

        public virtual Frequency frequency { get; set; }

        public virtual ExpenseType expenseType { get; set; }

        public virtual Boolean paymentDone {  get; set; }
    }
}
