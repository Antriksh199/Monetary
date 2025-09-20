namespace AdminController.DL.Entities
{
    public class ExpenseType : BaseModel
    {
        public virtual int ExpenseCategoryId { get; set; }
        public virtual string Name { get; set; }
    }
}
