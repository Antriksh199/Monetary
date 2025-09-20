using AdminController.BL.Implementation;
using AdminController.DL.contracts;
using AdminController.DL.Entities;
using AdminController.DL;

using NHibernate;

namespace AdminController.DL.Implementation
{
    public class ExpenseDL: IExpenseDL
    {
        public ExpenseCategory GetExpenseCategory(int Id)
        {
            ExpenseCategory expenseCategory = new ExpenseCategory();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    expenseCategory = session.Get<ExpenseCategory>(Id);
                    transaction.Commit();
                }

            }
            return expenseCategory;
        }

        public ExpenseCategory AddExpenseCategory(ExpenseCategory e)
        {
            ExpenseCategory expenseCategory = new ExpenseCategory();
            int id;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {

                    e.CreatedDate = Helper.GetISTDate(e.CreatedDate);
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    id = (int)session.Save(e);
                    transaction.Commit();
                    expenseCategory = session.Get<ExpenseCategory>(id);
                }

            }
            return expenseCategory;
        }

        public ExpenseCategory UpdateExpenseCategory(ExpenseCategory e)
        {
            ExpenseCategory expenseCategory = new ExpenseCategory();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    session.SaveOrUpdate(e);
                    transaction.Commit();
                    expenseCategory = session.Get<ExpenseCategory>(e.Id);
                }

            }
            return expenseCategory;
        }

        public ExpenseCategory DeleteExpenseCategory(ExpenseCategory e)
        {
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Delete(e);
                    transaction.Commit();

                }
            }
            return e;
        }

        public IList<ExpenseCategory> GetExpenseCategories()
        {
            IList<ExpenseCategory> expenseCategories = null;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    expenseCategories = session.Query<ExpenseCategory>().ToList();

                }
            }
            return expenseCategories;
        }

        public ExpenseType GetExpenseType(int e)
        {
            ExpenseType ExpenseType = new ExpenseType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    ExpenseType = session.Get<ExpenseType>(e);
                    transaction.Commit();
                }

            }
            return ExpenseType;
        }

        public ExpenseType AddExpenseType(ExpenseType e)
        {
            ExpenseType ExpenseType = new ExpenseType();
            int id;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.CreatedDate = Helper.GetISTDate(e.CreatedDate);
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    id = (int)session.Save(e);
                    transaction.Commit();
                    ExpenseType = session.Get<ExpenseType>(id);
                }

            }
            return ExpenseType;
        }

        public ExpenseType UpdateExpenseType(ExpenseType e)
        {
            ExpenseType ExpenseType = new ExpenseType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    session.SaveOrUpdate(e);
                    transaction.Commit();
                    ExpenseType = session.Get<ExpenseType>(e.Id);
                }
            }
            return ExpenseType;
        }

        public ExpenseType DeleteExpenseType(ExpenseType e)
        {
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Delete(e);
                    transaction.Commit();
                }
            }
            return e;
        }

        public IList<ExpenseType> GetExpenseTypes()
        {
            IList<ExpenseType> expensetypes = null;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    expensetypes = session.Query<ExpenseType>().ToList();
                }
            }
            return expensetypes;
        }

        

    }
}
