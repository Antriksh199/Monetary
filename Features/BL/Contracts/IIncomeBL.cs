using Features.DL.Entities;

namespace Features.BL.Contracts
{
    public interface IIncomeBL
    {
        Income GetIncomeById(int Id);

        IList<Income> GetIncomes();

        Income AddIncome(Income income);

        Income UpdateIncome(Income income);

        IList<Income> GetIncomesforUser(int userId);

        Income GetLatestIncome(int id);

        Income DeleteIncome(int id);

        /*Income UpdateIncome(Income income);

        Income PostIncome(Income income);

        */
    }
}
