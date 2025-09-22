using Features.BL.Contracts;
using Features.DL.Contracts;
using Features.DL.Entities;

namespace Features.BL.Implementation
{
    public class ExpenseBL: IExpenseBL
    {
        private readonly IExpenseDL expenseDL;

        public ExpenseBL(IExpenseDL expenseDL)
        {
            this.expenseDL = expenseDL;
        }

        public Expense GetExpenseById(int Id)
        {
            return expenseDL.GetExpenseById(Id);
        }

        public IList<Expense> GetExpenses()
        {
            return expenseDL.GetExpenses();
        }

        public Expense AddExpense(Expense expense)
        {
            return expenseDL.AddExpense(expense);
        }

        public Expense UpdateExpense(Expense expense)
        {
            return expenseDL.UpdateExpense(expense);
        }

        public IList<Expense> GetExpensesforUser(int userId)
        {
            return expenseDL.GetExpensesforUser(userId);
        }

        public Expense DeleteExpense(int id)
        {
            return expenseDL.DeleteExpense(id);
        }

        public Expense GetLatestExpense(int id)
        {
            return expenseDL.GetLatestExpense(id);
        }

    }
}
