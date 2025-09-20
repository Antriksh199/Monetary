using AdminController.BL.Implementation;
using AdminController.DL.contracts;
using AdminController.DL.Entities;

using NHibernate;
using NHibernate.Linq;

namespace AdminController.DL.Implementation
{
    public class IncomeTypeDL : IIncomeTypeDL
    {
        public List<IncomeType> GetIncomeTypes()
        {
            List<IncomeType> list = new List<IncomeType>();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    list = session.Query<IncomeType>().Fetch(x=>x.CreatedBy).
                        Fetch(x => x.ModifiedBy).
                        ToList();
                }
            }
            return list;
        }

        public IncomeType GetIncomeTypeById(int id)
        {
            IncomeType f = new IncomeType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<IncomeType>(id);
                }
            }
            return f;
        }

        public int AddIncomeType(IncomeType IncomeType)
        {
            int id;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {

                    IncomeType.CreatedDate = Helper.GetISTDate(IncomeType.CreatedDate);
                    IncomeType.ModifiedDate = Helper.GetISTDate(IncomeType.ModifiedDate);
                    id = (int)session.Save(IncomeType);
                    transaction.Commit();
                }

            }
            return id;

        }

        public IncomeType UpdateIncomeType(IncomeType IncomeType)
        {
            IncomeType f = new IncomeType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    IncomeType.CreatedDate = Helper.GetISTDate(IncomeType.CreatedDate);
                    IncomeType.ModifiedDate = Helper.GetISTDate(IncomeType.ModifiedDate);
                    session.Update(f);
                    transaction.Commit();

                }

            }
            return f;

        }

        public IncomeType DeleteIncomeType(int id)
        {
            IncomeType f = new IncomeType();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<IncomeType>(id);
                    session.Delete(f);
                    transaction.Commit();

                }

            }
            return f;

        }


    }
}
