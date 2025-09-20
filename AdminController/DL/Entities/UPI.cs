namespace AdminController.DL.Entities
{
    public class UPI: BaseModel
    {
        public virtual UserPaymentMethod UPaymentMethod { get; set; }
        public virtual string UpiId { get; set; }   
    }
}
