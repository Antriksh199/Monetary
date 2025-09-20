using AdminController.DL.Entities;

namespace AdminController.BL.Contracts
{
    public interface IExpenseBL
    {
        ExpenseCategory GetExpenseCategory(int e);

        ExpenseCategory AddExpenseCategory(ExpenseCategory e);

        ExpenseCategory UpdateExpenseCategory(ExpenseCategory e);

        ExpenseCategory DeleteExpenseCategory(ExpenseCategory e);

        IList<ExpenseCategory> GetExpenseCategories();

        ExpenseType GetExpenseType(int e);

        ExpenseType AddExpenseType(ExpenseType e);

        ExpenseType UpdateExpenseType(ExpenseType e);

        ExpenseType DeleteExpenseType(ExpenseType e);

        IList<ExpenseType> GetExpenseTypes();

        IList<ExpenseCategoryTypeWrapper> GetAllCategoryTypes();

    }
}
