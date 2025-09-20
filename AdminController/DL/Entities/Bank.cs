namespace AdminController.DL.Entities
{
    public class Bank: BaseModel
    {
        public virtual UserPaymentMethod UPaymentMethod { get; set; }
        public virtual string BankName { get; set; }

        public virtual string AccountType { get; set; }

        public virtual string AccountNumber { get; set; }

        public virtual string IFSC { get; set; }
                  
    }
}
