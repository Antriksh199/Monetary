using AdminController.DL.Entities;

namespace AdminController.DL.contracts
{
    public interface IIncomeTypeDL
    {

        List<IncomeType> GetIncomeTypes();
        IncomeType GetIncomeTypeById(int id);

        int AddIncomeType(IncomeType incomeType);

        IncomeType UpdateIncomeType(IncomeType incomeType);

        IncomeType DeleteIncomeType(int id);

    }
}
