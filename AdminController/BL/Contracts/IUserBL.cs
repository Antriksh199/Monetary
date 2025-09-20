using AdminController.DL.Entities;

namespace AdminController.BL.Contracts
{
    public interface IUserBL
    {
        List<User> GetUsers();
        User GetUserById(int Id);

        User GetUserByUsername(string username);
        User AddUser(User User);
        User UpdateUser(User User);
        User DeleteUser(int id);
    }
}
