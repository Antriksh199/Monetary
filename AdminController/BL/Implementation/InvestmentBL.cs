using AdminController.BL.Contracts;
using AdminController.DL.contracts;
using AdminController.DL.Entities;

namespace AdminController.BL.Implementation
{
    public class InvestmentBL: IInvestmentBL
    {
        private readonly IInvestmentDL investmentDL;
        public InvestmentBL(IInvestmentDL investmentDL)
        {
            this.investmentDL = investmentDL;
        }

        public InvestmentCategory GetInvestmentCategory(int id)
        {
            return investmentDL.GetInvestmentCategory(id);
        }

        public InvestmentCategory AddInvestmentCategory(InvestmentCategory e)
        {
            return investmentDL.AddInvestmentCategory(e);
        }

        public InvestmentCategory UpdateInvestmentCategory(InvestmentCategory e)
        {
            return investmentDL.UpdateInvestmentCategory(e);
        }

        public InvestmentCategory DeleteInvestmentCategory(InvestmentCategory e)
        {
            return investmentDL.DeleteInvestmentCategory(e);
        }

        public IList<InvestmentCategory> GetInvestmentCategories()
        {
            return investmentDL.GetInvestmentCategories();
        }

        public InvestmentType GetInvestmentType(int e)
        {
            return investmentDL.GetInvestmentType(e);
        }

        public InvestmentType AddInvestmentType(InvestmentType e)
        {
            return investmentDL.AddInvestmentType(e);
        }

        public InvestmentType UpdateInvestmentType(InvestmentType e)
        {
            return investmentDL.UpdateInvestmentType(e);
        }

        public InvestmentType DeleteInvestmentType(InvestmentType e)
        {
            return investmentDL.DeleteInvestmentType(e);
        }

        public IList<InvestmentType> GetInvestmentTypes()
        {
            return investmentDL.GetInvestmentTypes();
        }

        public IList<InvestmentCategoryWrapper> GetAllCategoryTypes()
        {
            IList<InvestmentCategoryWrapper> ect = null;
            IList<InvestmentCategory> ec = GetInvestmentCategories();
            IList<InvestmentType> et = GetInvestmentTypes();

            ect = ec.Select(cat => new InvestmentCategoryWrapper
            {
                InvestmentCategory = cat,
                InvestmentTypes = et.Where(x => x.CategoryId == cat.Id).ToList()
            }
            ).ToList();
            return ect;
        }
    }
}
