using Features.DL.Entities;

namespace Features.DL.Contracts
{
    public interface IExpenseDL
    {
        Expense GetExpenseById(int Id);

        IList<Expense> GetExpenses();

        IList<Expense> GetExpensesforUser(int Id);
        Expense AddExpense(Expense Expense);

        Expense UpdateExpense(Expense Expense);

        Expense DeleteExpense(int Id);

        Expense GetLatestExpense(int userId);
    }
}
