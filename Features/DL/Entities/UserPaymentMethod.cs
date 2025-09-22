namespace Features.DL.Entities
{
    public class UserPaymentMethod : BaseModel
    {
        public virtual User User { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }

    }
}
