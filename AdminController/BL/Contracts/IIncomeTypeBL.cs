using AdminController.DL.Entities;

namespace AdminController.BL.Contracts
{
    public interface IIncomeTypeBL
    {
        List<IncomeType> GetIncomeTypes();
        IncomeType GetIncomeTypeById(int Id);
        int AddIncomeType(IncomeType IncomeType);
        IncomeType UpdateIncomeType(IncomeType IncomeType);
        IncomeType DeleteIncomeType(int id);
    }
}
