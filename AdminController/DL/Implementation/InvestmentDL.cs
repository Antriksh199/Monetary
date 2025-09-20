using AdminController.DL.Entities;
using AdminController.DL.contracts;

using NHibernate;

namespace AdminController.DL.Implementation
{
    public class InvestmentDL: IInvestmentDL
    {
        public InvestmentCategory GetInvestmentCategory(int Id)
        {
            InvestmentCategory investmentCategory = new InvestmentCategory();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    investmentCategory = session.Get<InvestmentCategory>(Id);
                    transaction.Commit();
                }

            }
            return investmentCategory;
        }

        public InvestmentCategory AddInvestmentCategory(InvestmentCategory e)
        {
            InvestmentCategory investmentCategory = new InvestmentCategory();
            int id;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.CreatedDate = Helper.GetISTDate(e.CreatedDate);
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    id = (int)session.Save(e);
                    transaction.Commit();
                    investmentCategory = session.Get<InvestmentCategory>(id);
                }

            }
            return investmentCategory;
        }

        public InvestmentCategory UpdateInvestmentCategory(InvestmentCategory e)
        {
            InvestmentCategory investmentCategory = new InvestmentCategory();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.CreatedDate = Helper.GetISTDate(e.CreatedDate);
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    session.SaveOrUpdate(e);
                    transaction.Commit();
                    investmentCategory = session.Get<InvestmentCategory>(e.Id);
                }

            }
            return investmentCategory;
        }

        public InvestmentCategory DeleteInvestmentCategory(InvestmentCategory e)
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

        public IList<InvestmentCategory> GetInvestmentCategories()
        {
            IList<InvestmentCategory> investmentCategories = null;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    investmentCategories = session.Query<InvestmentCategory>().ToList();

                }
            }
            return investmentCategories;
        }

        public InvestmentType GetInvestmentType(int e)
        {
            InvestmentType InvestmentType = new InvestmentType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    InvestmentType = session.Get<InvestmentType>(e);
                    transaction.Commit();
                }

            }
            return InvestmentType;
        }

        public InvestmentType AddInvestmentType(InvestmentType e)
        {
            InvestmentType InvestmentType = new InvestmentType();
            int id;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.CreatedDate = Helper.GetISTDate(e.CreatedDate);
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    id = (int)session.Save(e);
                    transaction.Commit();
                    InvestmentType = session.Get<InvestmentType>(id);
                }

            }
            return InvestmentType;
        }

        public InvestmentType UpdateInvestmentType(InvestmentType e)
        {
            InvestmentType InvestmentType = new InvestmentType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    e.CreatedDate = Helper.GetISTDate(e.CreatedDate);
                    e.ModifiedDate = Helper.GetISTDate(e.ModifiedDate);
                    session.SaveOrUpdate(e);
                    transaction.Commit();
                    InvestmentType = session.Get<InvestmentType>(e.Id);
                }
            }
            return InvestmentType;
        }

        public InvestmentType DeleteInvestmentType(InvestmentType e)
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

        public IList<InvestmentType> GetInvestmentTypes()
        {
            IList<InvestmentType> investmenttypes = null;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    investmenttypes = session.Query<InvestmentType>().ToList();
                }
            }
            return investmenttypes;
        }
    }
}
