namespace AdminController.DL.Entities
{
    public class IncomeType :BaseModel
    {
        public virtual string Name { get; set; }

        public virtual string Description { get; set; }
    }
}
