namespace Features.DL.Entities
{
    public class Cash: BaseModel
    {
        public virtual UserPaymentMethod UPaymentMethod { get; set; }
    }
}
