namespace AdminController.DL.Entities
{
    public class InvestmentCategoryWrapper
    {
        public InvestmentCategory InvestmentCategory { get; set; }
        public IList<InvestmentType> InvestmentTypes { get; set; }
    }
}
