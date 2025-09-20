namespace AdminController.DL.Entities
{
    public class AddPaymentMethod
    {
        public virtual string PaymentMethod { get; set; }

        public virtual Card? Card { get; set; }

        public virtual Bank? Bank { get; set; }

        public virtual UPI? UPI { get; set; }

        public virtual Cash? Cash { get; set; }


    }
}
