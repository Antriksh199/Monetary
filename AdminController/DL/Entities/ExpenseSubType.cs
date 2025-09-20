namespace AdminController.DL.Entities
{
    public class ExpenseSubType: BaseModel
    {
        public virtual int ExpenseTypeId { get; set; }

        public virtual string Name { get; set; }
    }
}
