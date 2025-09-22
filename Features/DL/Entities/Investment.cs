namespace Features.DL.Entities
{
    public class Investment: BaseModel
    {
        public virtual User User { get; set; }
        public virtual Frequency Frequency { get; set; }
        public virtual Boolean Invested { get; set; }

        public virtual Decimal Value { get; set; }
        public virtual string InvestedTo { get; set; }

        public virtual Decimal GrowthRate { get; set; }

        public virtual UserPaymentMethod InvestedVia { get; set; }

        public virtual InvestmentType InvestmentType { get; set; }

        public virtual InvestmentCategory InvestmentCategory { get; set; }
        public virtual string Description { get; set; }

        public virtual DateTime? InvestedOn { get; set; }

        public virtual Decimal Tenure { get; set; }

    }
}
