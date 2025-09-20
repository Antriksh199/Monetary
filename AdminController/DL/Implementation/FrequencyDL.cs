
using AdminController.DL.Entities;
using NHibernate;
using AdminController.DL.contracts;
using NHibernate.Linq;
using AdminController.DL;

namespace AdminController.DL.Implementation
{
    public class FrequencyDL : IFrequencyDL
    {
        public List<Frequency> GetFrequencies()
        {
            List<Frequency> list = new List<Frequency>();
           using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                        list = session.Query<Frequency>().Fetch(x=>x.CreatedBy).Fetch(x=>x.ModifiedBy).
                        ToList();
                }
                }
            return list;
        }

        public Frequency GetFrequencyById(int id)
        {
            Frequency f = new Frequency();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<Frequency>(id);
                }
            }
            return f;
        }

        public int AddFrequency(Frequency frequency)
        {
            int id;
                using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                    frequency.CreatedDate = Helper.GetISTDate(frequency.CreatedDate);
                    frequency.ModifiedDate = Helper.GetISTDate(frequency.ModifiedDate);
                    id = (int)session.Save(frequency);
                    transaction.Commit();
                    }

                }
                return id;
        }

        public Frequency UpdateFrequency(Frequency frequency)
        {
            Frequency f = new Frequency();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {
                    frequency.CreatedDate = Helper.GetISTDate(frequency.CreatedDate);
                    frequency.ModifiedDate = Helper.GetISTDate(frequency.ModifiedDate);
                    session.Update(f);
                        transaction.Commit();

                    }

                }
            return f;

        }

        public Frequency DeleteFrequency(int id)
        {
            Frequency f = new Frequency();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {   
                    f = session.Get<Frequency>(id);
                    session.Delete(f);
                    transaction.Commit();

                }
            }
            return f ;

        }


    }
}
