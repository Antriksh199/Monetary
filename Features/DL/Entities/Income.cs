namespace Features.DL.Entities
{
    public class Income: BaseModel
    {
        public virtual User User { get; set; }
        public virtual Frequency Frequency {  get; set; }

        public  virtual IncomeType Source { get; set; }

        public virtual Boolean Received { get; set; }

        public virtual Decimal Value { get; set; }

        public virtual string ReceivedFrom {  get; set; }

        public virtual DateTime? ReceivedOn { get; set; }

        public virtual UserPaymentMethod ReceivedIn {  get; set; }

        public virtual string Description { get; set; }
    }
}
