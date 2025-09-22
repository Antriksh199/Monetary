using Features.DL.Entities;

namespace Features.BL.Contracts
{
    public interface IInvestmentBL
    {
        Investment GetInvestmentById(int Id);

        IList<Investment> GetInvestments();

        IList<Investment> GetInvestmentsforUser(int Id);
        Investment AddInvestment(Investment Investment);

        Investment GetLatestInvestment(int id);

        Investment UpdateInvestment(Investment Investment);

        Investment DeleteInvestment(int Id);
    }
}
