using AdminController.DL.Entities;

namespace AdminController.BL.Contracts
{
    public interface IInvestmentBL
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

        IList<InvestmentCategoryWrapper> GetAllCategoryTypes();
    }
}
