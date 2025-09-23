using AdminController.BL.Contracts;
using AdminController.BL.Implementation;
using AdminController.DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminController.Controllers.Admin
{
    [Authorize]
    [Area("admin")]
    [Route("api/[Area]/[controller]")]
    [ApiController]
    public class ExpenseController : Controller
    {
        private readonly IExpenseBL expenseBL;

        //private static readonly ILog //_logger = LogManager.GetLogger(typeof(ExpenseController));
        public ExpenseController(IExpenseBL expenseBL)
        {
            this.expenseBL = expenseBL;
        }

        [HttpGet("expensecategory/{id}")]
        public ActionResult<DBReturn> GetExpenseCategoryById(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpenseCategory(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - GetExpenseCategoryById() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - GetExpenseCategoryById() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("expensecategorytype")]
        public ActionResult<DBReturn> GetExpenseCategoryType()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetAllCategoryTypes();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - GetExpenseCategoryType() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - GetExpenseCategoryType() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("expensecategory")]
        public ActionResult<DBReturn> GetExpenseCategories()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpenseCategories();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - GetExpenseCategories() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "ExpenseCategory - GetExpenseCategories() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPut("expensecategory")]
        public ActionResult<DBReturn> UpdateExpenseCategory(ExpenseCategory ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.UpdateExpenseCategory(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - UpdateExpenseCategory() completed !");
                return Ok(dBReturn);

            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - UpdateExpenseCategory() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost("expensecategory")]
        public ActionResult<DBReturn> AddExpenseCategory(ExpenseCategory ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.AddExpenseCategory(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - AddExpenseCategory() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - AddExpenseCategory() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("expensetype/{id}")]
        public ActionResult<DBReturn> GetExpenseTypeById(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpenseType(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - GetExpenseTypeById() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - GetExpenseTypeById() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("expensetype")]
        public ActionResult<DBReturn> GetExpenseTypes()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpenseTypes();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - GetExpenseTypes() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - GetExpenseTypes() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPut("expensetype")]
        public ActionResult<DBReturn> UpdateExpenseType(ExpenseType ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.UpdateExpenseType(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - UpdateExpenseType() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - UpdateExpenseType() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost("expensetype")]
        public ActionResult<DBReturn> AddExpenseType(ExpenseType ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.AddExpenseType(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Expense - AddExpenseType() ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - AddExpenseType() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }
    }
}
