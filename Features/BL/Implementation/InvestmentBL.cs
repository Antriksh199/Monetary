using Features.BL.Contracts;
using Features.DL.Contracts;
using Features.DL.Entities;

namespace Features.BL.Implementation
{
    public class InvestmentBL: IInvestmentBL
    {
        private readonly IInvestmentDL investmentDL;

        public InvestmentBL(IInvestmentDL investmentDL)
        {
            this.investmentDL = investmentDL;
        }

        public Investment GetInvestmentById(int Id)
        {
            return investmentDL.GetInvestmentById(Id);
        }

        public IList<Investment> GetInvestments()
        {
            return investmentDL.GetInvestments();
        }

        public Investment AddInvestment(Investment investment)
        {
            return investmentDL.AddInvestment(investment);
        }

        public Investment UpdateInvestment(Investment investment)
        {
            return investmentDL.UpdateInvestment(investment);
        }

        public IList<Investment> GetInvestmentsforUser(int userId)
        {
            return investmentDL.GetInvestmentsforUser(userId);
        }

        public Investment DeleteInvestment(int id)
        {
            return investmentDL.DeleteInvestment(id);
        }

        public Investment GetLatestInvestment(int userId)
        {
            return investmentDL.GetLatestInvestment(userId);
        }

    }
}
