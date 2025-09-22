using Features.DL.Entities;

namespace Features.DL.Contracts
{
    public interface IInvestmentDL
    {
        Investment GetInvestmentById(int Id);

        IList<Investment> GetInvestments();

        IList<Investment> GetInvestmentsforUser(int Id);
        Investment AddInvestment(Investment Investment);

        Investment UpdateInvestment(Investment Investment);

        Investment GetLatestInvestment(int userId);

        Investment DeleteInvestment(int Id);
    }
}
