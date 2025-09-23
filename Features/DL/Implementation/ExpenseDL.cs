using Features.DL.Contracts;
using Features.DL.Entities;
using Features.DL;
using NHibernate;

namespace Features.DL.Implementation
{
    public class ExpenseDL: IExpenseDL
    {
        public Expense GetExpenseById(int ExpenseId)
        {
            Expense Expense = new Expense();
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Expense = session.Get<Expense>(ExpenseId);
                }
            }

            return Expense;
        }

        public IList<Expense> GetExpenses()
        {
            IList<Expense> Expense = new List<Expense>();
            string query = @"from Expense i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.ExpenseCategory
                          join fetch i.ExpenseType
                          join fetch i.PaidVia iU 
                          join fetch iU.User join fetch iU.PaymentMethod";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Expense = session.CreateQuery(query).List<Expense>();
                }
            }
            return Expense;
        }

        public Expense GetLatestExpense(int userId)
        {
            Expense Expense = new Expense();
            string query = @"from Expense i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.ExpenseCategory
                          join fetch i.ExpenseType
                          join fetch i.PaidVia iU 
                          join fetch iU.User join fetch iU.PaymentMethod
                          where i.User.Id = :userId order by i.ModifiedDate desc";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Expense = session.CreateQuery(query).
                        SetParameter("userId", userId).List<Expense>().FirstOrDefault();
                }
            }
            return Expense;
        }

        public IList<Expense> GetExpensesforUser(int userId)
        {
            IList<Expense> Expense = new List<Expense>();
            string query = @"from Expense i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.ExpenseCategory
                          join fetch i.ExpenseType
                          join fetch i.PaidVia iU 
                          join fetch iU.User join fetch iU.PaymentMethod
                          where i.User.Id = :userId order by i.ModifiedDate desc";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Expense = session.CreateQuery(query).
                        SetParameter("userId", userId).List<Expense>();

                }
            }
            return Expense;
        }

        public Expense AddExpense(Expense Expense)
        {
            Expense inc = new Expense();
            int id;
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Expense.CreatedDate = Helper.GetISTDate(Expense.CreatedDate);
                    Expense.ModifiedDate = Helper.GetISTDate(Expense.ModifiedDate);
                    id = (int)session.Save(Expense);
                    transaction.Commit();
                    inc = session.Get<Expense>(id);
                }

            }
            return inc;
        }

        public Expense UpdateExpense(Expense Expense)
        {
            Expense inc = new Expense();
            int id;
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Expense.ModifiedDate = Helper.GetISTDate(Expense.ModifiedDate);
                    session.SaveOrUpdate(Expense);
                    transaction.Commit();

                }

            }
            return Expense;
        }

        public Expense DeleteExpense(int id)
        {
            Expense inc = new Expense();
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    inc = session.Get<Expense>(id);
                    session.Delete(inc);
                    transaction.Commit();
                }

            }
            return inc;
        }
    }
}
