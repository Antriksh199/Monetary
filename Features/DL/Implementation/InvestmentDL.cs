using Features.DL.Contracts;
using Features.DL.Entities;

using NHibernate;

namespace Features.DL.Implementation
{
    public class InvestmentDL: IInvestmentDL
    {
        public Investment GetInvestmentById(int InvestmentId)
            {
                Investment Investment = new Investment();
                using (NHibernate.ISession session = NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        Investment = session.Get<Investment>(InvestmentId);
                    }
                }

                return Investment;
            }


            public IList<Investment> GetInvestments()
            {
                IList<Investment> Investment = new List<Investment>();
                string query = @"from Investment i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.InvestmentCategory
                          join fetch i.InvestmentItem
                          join fetch i.InvestedVia iU 
                          join fetch iU.User join fetch iU.PaymentMethod";
                using (NHibernate.ISession session = NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        Investment = session.CreateQuery(query).List<Investment>();
                    }
                }
                return Investment;
            }

        public Investment GetLatestInvestment(int userId)
        {
            Investment Investment = new Investment();
            string query = @"from Investment i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.InvestmentCategory
                          join fetch i.InvestmentType
                          join fetch i.InvestedVia iU 
                          join fetch iU.User join fetch iU.PaymentMethod
                          where i.User.Id = :userId order by i.ModifiedDate desc";
            using (NHibernate.ISession session = NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Investment = session.CreateQuery(query).
                        SetParameter("userId", userId).List<Investment>().FirstOrDefault();

                }
            }
            return Investment;
        }

        public IList<Investment> GetInvestmentsforUser(int userId)
            {
                IList<Investment> Investment = new List<Investment>();
                string query = @"from Investment i
                          join fetch i.User
                          join fetch i.Frequency
                          join fetch i.InvestmentCategory
                          join fetch i.InvestmentType
                          join fetch i.InvestedVia iU 
                          join fetch iU.User join fetch iU.PaymentMethod
                          where i.User.Id = :userId order by i.ModifiedDate desc";
                using (NHibernate.ISession session = NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        Investment = session.CreateQuery(query).
                            SetParameter("userId", userId).List<Investment>();

                    }
                }
                return Investment;
            }

            public Investment AddInvestment(Investment Investment)
            {
                Investment inc = new Investment();
                int id;
                using (NHibernate.ISession session = NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        Investment.CreatedDate = Helper.GetISTDate(Investment.CreatedDate);
                        Investment.ModifiedDate = Helper.GetISTDate(Investment.ModifiedDate);
                        id = (int)session.Save(Investment);
                        transaction.Commit();
                        inc = session.Get<Investment>(id);
                    }

                }
                return inc;
            }

            public Investment UpdateInvestment(Investment Investment)
            {
                Investment inc = new Investment();
                int id;
                using (NHibernate.ISession session = NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        Investment.ModifiedDate = Helper.GetISTDate(Investment.ModifiedDate);
                        session.SaveOrUpdate(Investment);
                        transaction.Commit();
                    }

                }
                return Investment;
            }

            public Investment DeleteInvestment(int id)
            {
                Investment inc = new Investment();
                using (NHibernate.ISession session = NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        inc = session.Get<Investment>(id);
                        session.Delete(inc);
                        transaction.Commit();
                    }

                }
                return inc;
            }

        }
    }

