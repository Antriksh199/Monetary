using AdminController.DL.Entities;

namespace AdminController.DL.contracts
{
    public interface IExpenseDL
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

    }
}
