using AdminController.BL.Contracts;
using AdminController.DL.contracts;
using AdminController.DL.Entities;
using AdminController.DL.Implementation;

namespace AdminController.BL.Implementation
{
    public class IncomeTypeBL : IIncomeTypeBL
    {
        public IConfiguration _configuration;

        public IIncomeTypeDL _IncomeTypeDL;

        public IncomeTypeBL(IIncomeTypeDL fDL, IConfiguration Configuration)
        {
            _configuration = Configuration;
            _IncomeTypeDL = fDL;
        }

        public List<IncomeType> GetIncomeTypes()
        {
            return _IncomeTypeDL.GetIncomeTypes();
        }

        public IncomeType GetIncomeTypeById(int id)
        {
            return _IncomeTypeDL.GetIncomeTypeById(id);
        }

        public int AddIncomeType(IncomeType IncomeType)
        {
            int id = _IncomeTypeDL.AddIncomeType(IncomeType);
            return id;
        }

        public IncomeType UpdateIncomeType(IncomeType IncomeType)
        {
            IncomeTypeDL dL = new IncomeTypeDL();
            return dL.UpdateIncomeType(IncomeType);
        }

        public IncomeType DeleteIncomeType(int id)
        {
            return _IncomeTypeDL.DeleteIncomeType(id);
        }


    }

    }
