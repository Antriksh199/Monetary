using AdminController.DL.contracts;
using AdminController.DL.Entities;
using AdminController.DL.Implementation;
using AdminController.BL.Contracts;
namespace AdminController.BL.Implementation
{
    public class UserBL : IUserBL
    {

        public IConfiguration _configuration;

        public IUserDL _UserDL;

        public UserBL(IUserDL fDL, IConfiguration Configuration)
        {
            _configuration = Configuration;
            _UserDL = fDL;
        }

        public List<User> GetUsers()
        {
            return _UserDL.GetUsers();
        }

        public User GetUserById(int id)
        {
            return _UserDL.GetUserById(id);
        }

        public User GetUserByUsername(string username)
        {
            return _UserDL.GetUserByUsername(username);
        }

        public User AddUser(User User)
        {
            return _UserDL.AddUser(User);
            
        }

        public User UpdateUser(User User)
        {
            return _UserDL.UpdateUser(User);
        }

        public User DeleteUser(int id)
        {
            return _UserDL.DeleteUser(id);
        }

    }
}
