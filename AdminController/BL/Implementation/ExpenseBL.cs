using AdminController.BL.Contracts;
using AdminController.DL.contracts;
using AdminController.DL.Entities;
using AdminController.DL.Implementation;

namespace AdminController.BL.Implementation
{
    public class ExpenseBL : IExpenseBL
    {
        private readonly IExpenseDL expenseDL;
        public ExpenseBL(IExpenseDL expenseDL)
        {
            this.expenseDL = expenseDL;
        }

        public ExpenseCategory GetExpenseCategory(int id)
        {
            return expenseDL.GetExpenseCategory(id);
        }

        public ExpenseCategory AddExpenseCategory(ExpenseCategory e)
        {
            return expenseDL.AddExpenseCategory(e);
        }

        public ExpenseCategory UpdateExpenseCategory(ExpenseCategory e)
        {
            return expenseDL.UpdateExpenseCategory(e);
        }

        public ExpenseCategory DeleteExpenseCategory(ExpenseCategory e)
        {
            return expenseDL.DeleteExpenseCategory(e);
        }

        public IList<ExpenseCategory> GetExpenseCategories()
        {
            return expenseDL.GetExpenseCategories();
        }

        public ExpenseType GetExpenseType(int e)
        {
            return expenseDL.GetExpenseType(e);
        }

        public ExpenseType AddExpenseType(ExpenseType e)
        {
            return expenseDL.AddExpenseType(e);
        }

        public ExpenseType UpdateExpenseType(ExpenseType e)
        {
            return expenseDL.UpdateExpenseType(e);
        }

        public ExpenseType DeleteExpenseType(ExpenseType e)
        {
            return expenseDL.DeleteExpenseType(e);
        }

        public IList<ExpenseType> GetExpenseTypes()
        {
            return expenseDL.GetExpenseTypes();
        }

        public IList<ExpenseCategoryTypeWrapper> GetAllCategoryTypes()
        {
            IList<ExpenseCategoryTypeWrapper> ect = null;
            IList<ExpenseCategory> ec = GetExpenseCategories();
            IList<ExpenseType> et = GetExpenseTypes();

            ect = ec.Select(cat => new ExpenseCategoryTypeWrapper
            {
                ExpenseCategory = cat,
                ExpenseTypes = et.Where(x => x.ExpenseCategoryId == cat.Id).ToList()
            }
            ).ToList();
            return ect;
        }
    }
    
}
