namespace Features.DL.Entities
{
    public class InvestmentType: BaseModel
    {
        public virtual int CategoryId { get; set; }

        public virtual string Name { get; set; }
        
        public virtual Decimal GrowthRate { get; set; }

        public virtual string Risk { get; set; }
    }
}
