namespace Features.DL.Entities
{
    public class ExpenseCategoryTypeWrapper
    {
        public ExpenseCategory ExpenseCategory { get; set; }
        public IList<ExpenseType> ExpenseTypes { get; set; }
    }
}
