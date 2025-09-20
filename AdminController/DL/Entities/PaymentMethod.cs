namespace AdminController.DL.Entities
{
    public class PaymentMethod: BaseModel
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

    }
}
