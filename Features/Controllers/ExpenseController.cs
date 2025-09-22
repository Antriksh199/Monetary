using Features.BL.Contracts;
using Features.DL.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Features.Controllers
{
    [Authorize]
    [Area("expense")]
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : Controller
    {
        private readonly IExpenseBL expenseBL;

        public ExpenseController(IExpenseBL expenseBL)
        {
            this.expenseBL=expenseBL;
        }

        [HttpGet]
        public ActionResult<DBReturn>Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpenses();
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - Get() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("latest/{id}")]
        public ActionResult<DBReturn> GetLatestExpense(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetLatestExpense(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - GetLatest() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("userexpenses/{userId}")]
        public ActionResult<DBReturn>GetExpensesforUser(int userId)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpensesforUser(userId);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - GetExpensesforUser() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("id")]
        public ActionResult<DBReturn>Get(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.GetExpenseById(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost]
        public ActionResult<DBReturn>AddExpense(Expense expense)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.AddExpense(expense);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - Post(expense) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPut]
        public ActionResult<DBReturn>UpdateExpense(Expense expense)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.UpdateExpense(expense);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - UpdateExpense(expense) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

        }

        [HttpDelete("{id}")]
        public ActionResult<DBReturn>DeleteExpense(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = expenseBL.DeleteExpense(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Expense - DeleteExpense(id) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

        }
    }
}
