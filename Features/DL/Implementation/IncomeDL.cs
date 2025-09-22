using Features.BL.Implementation;
using Features.DL.Contracts;
using Features.DL.Entities;

using NHibernate;

namespace Features.DL.Implementation
{
    public class IncomeDL: IIncomeDL
    {
        public Income GetIncomeById(int incomeId)
        {
            Income income = new Income();
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    income = session.Get<Income>(incomeId);
                }
            }

            return income;
        }

        public Income GetLatestIncome(int userId)
        {
            Income income = new Income();
            string query = @"from Income i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.Source
                          join fetch i.ReceivedIn iU 
                          join fetch iU.User join fetch iU.PaymentMethod
                           where i.User.Id = :userId order by i.ModifiedDate desc";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    income = session.CreateQuery(query).
                        SetParameter("userId", userId).List<Income>().FirstOrDefault();

                }
            }
            return income;
        }
        public IList<Income> GetIncomes()
        {
            IList<Income> income = new List<Income>();
            string query = @"from Income i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.Source
                          join fetch i.ReceivedIn iU 
                          join fetch iU.User join fetch iU.PaymentMethod";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    income = session.CreateQuery(query).List<Income>();
                }
            }
            return income;
        }

        public IList<Income> GetIncomesforUser(int userId)
        {
            IList<Income> income = new List<Income>();
            string query = @"from Income i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.Source
                          join fetch i.ReceivedIn iU 
                          join fetch iU.User join fetch iU.PaymentMethod
                           where i.User.Id = :userId order by i.ModifiedDate desc";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    income = session.CreateQuery(query).
                        SetParameter("userId",userId).List<Income>();  

                }
            }
            return income;
        }

        public Income AddIncome(Income income)
        {
            Income inc = new Income();
            int id;
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    income.CreatedDate = Helper.GetISTDate(income.CreatedDate);
                    income.ModifiedDate = Helper.GetISTDate(income.ModifiedDate);
                    id = (int)session.Save(income);
                    transaction.Commit();
                    inc = session.Get<Income>(id);
                }

            }
            return inc;
        }

        public Income UpdateIncome(Income income)
        {
            Income inc = new Income();
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    income.ModifiedDate = Helper.GetISTDate(income.ModifiedDate);
                    session.SaveOrUpdate(income);
                    transaction.Commit();
                    inc = session.Get<Income>(1);
                }

            }
            return inc;
        }

        public Income DeleteIncome(int id)
        {
            Income inc = new Income();
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    inc = session.Get<Income>(id);
                    session.Delete(inc);
                    transaction.Commit();
                }

            }
            return inc;
        }



    }
}
