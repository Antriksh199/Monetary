using AdminController.DL.Entities;

namespace AdminController.DL.contracts
{
    public interface IUserDL
    {
        List<User> GetUsers();
        User GetUserById(int id);

        User AddUser(User User);

        User UpdateUser(User User);

        User DeleteUser(int id);

        User GetUserByUsername(string username);
    }
}
