using Features.DL.Entities;

namespace Features.DL.Contracts
{
    public interface IIncomeDL
    {
        Income GetIncomeById(int Id);

        IList<Income> GetIncomes();

        IList<Income> GetIncomesforUser(int Id);
        Income AddIncome(Income income);

        Income UpdateIncome(Income income);

        Income DeleteIncome(int Id);

        Income GetLatestIncome(int userId);


        //Income GetLatestIncome();


        /*Income UpdateIncome(Income income);

        Income PostIncome(Income income);

        */

    }
}
