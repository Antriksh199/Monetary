using AdminController.DL.Entities;

namespace AdminController.DL.contracts
{
    public interface IInvestmentDL
    {
        InvestmentCategory GetInvestmentCategory(int e);

        InvestmentCategory AddInvestmentCategory(InvestmentCategory e);

        InvestmentCategory UpdateInvestmentCategory(InvestmentCategory e);

        InvestmentCategory DeleteInvestmentCategory(InvestmentCategory e);

        IList<InvestmentCategory> GetInvestmentCategories();

        InvestmentType GetInvestmentType(int e);

        InvestmentType AddInvestmentType(InvestmentType e);

        InvestmentType UpdateInvestmentType(InvestmentType e);

        InvestmentType DeleteInvestmentType(InvestmentType e);

        IList<InvestmentType> GetInvestmentTypes();
    }
}
