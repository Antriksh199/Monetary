using Features.BL.Contracts;
using Features.DL.Contracts;
using Features.DL.Entities;
using Features.DL.Implementation;

namespace Features.BL.Implementation
{
    public class IncomeBL: IIncomeBL
    {
        private readonly IIncomeDL  incomeDL;

        public IncomeBL(IIncomeDL incomeDL)
        {
           this.incomeDL = incomeDL;
        }

        public Income GetIncomeById(int Id)
        {
            return incomeDL.GetIncomeById(Id);
        }

        public IList<Income> GetIncomes()
        {
            return incomeDL.GetIncomes();   
        }

        public Income AddIncome(Income income)
        {
            return incomeDL.AddIncome(income);
        }

        public Income UpdateIncome(Income income)
        {
            return incomeDL.UpdateIncome(income);
        }

        public IList<Income> GetIncomesforUser(int userId)
        {
            return incomeDL.GetIncomesforUser(userId);
        }

        public Income GetLatestIncome(int userId)
        {
            return incomeDL.GetLatestIncome(userId);
        }

        public Income DeleteIncome(int id)
        {
            return incomeDL.DeleteIncome(id);
        }
    }
}
