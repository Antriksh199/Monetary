using AdminController.DL.contracts;
using AdminController.DL.Entities;

using NHibernate;

namespace AdminController.DL.Implementation
{
    public class UserDL : IUserDL
    {

        public List<User> GetUsers()
        {
            List<User> list = new List<User>();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    list = session.Query<User>().ToList();
                }
            }
            return list;
        }

        public User GetUserById(int id)
        {
            User f = new User();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<User>(id);
                }
            }
            return f;
        }

        public User GetUserByUsername(string username)
        {
            User f = new User();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Query<User>().Where(x => x.UserName.ToLower() == username.ToLower()).FirstOrDefault();
                }
            }
            return f;
        }

        public User AddUser(User user)
        {
            User user1 = new User();
            int ret = 0;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {

                    user.CreatedDate = Helper.GetISTDate(user.CreatedDate);
                    user.ModifiedDate = Helper.GetISTDate(user.ModifiedDate);
                    ret = (int)session.Save(user);
                    transaction.Commit();
                    user1 = session.Get<User>(ret);

                }

            }
            return user1;

        }

        public User UpdateUser(User User)
        {
            User f = new User();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.Update(User);
                    transaction.Commit();

                }

            }
            return f;

        }

        public User DeleteUser(int id)
        {
            User f = new User();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<User>(id);
                    session.Delete(f);
                    transaction.Commit();

                }

            }
            return f;

        }
    }
}
