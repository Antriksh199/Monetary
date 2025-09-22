namespace Features.DL.Entities
{
    public class Card : BaseModel
    {
        public virtual UserPaymentMethod? UPaymentMethod { get; set; }
        public virtual string? Provider { get; set; } //HDFC, SBI

        public virtual string? CustomerName { get; set; }
        public virtual int? CVV { get; set; }

        public virtual string? CardType { get; set; }
        public virtual string? CardNumber { get; set; }

        public virtual DateTime? ExpiryDate { get; set; }
    }
}
