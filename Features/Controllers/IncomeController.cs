using Features.BL.Contracts;
using Features.BL.Implementation;
using Features.DL.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Features.Controllers
{
    [Authorize]
    [Area("income")]
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : Controller
    {
        private readonly IIncomeBL incomeBL;

        public IncomeController(IIncomeBL incomeBL)
        {
            this.incomeBL=incomeBL;
        }

        [HttpGet]
        public ActionResult<DBReturn> Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.GetIncomes();
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - Get() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

            return dBReturn;
        }

        [HttpGet("latest/{id}")]
        public ActionResult<DBReturn> GetLatestIncome(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.GetLatestIncome(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - GetLatest() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

            return dBReturn;
        }

        [HttpGet("userincomes/{userId}")]
        public ActionResult<DBReturn> GetIncomesforUser(int userId)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.GetIncomesforUser(userId);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - GetIncomesforUser() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

            return dBReturn;
        }

        [HttpGet("id")]
        public ActionResult<DBReturn> Get(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.GetIncomeById(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

            return dBReturn;
        }

        [HttpPost]
        public ActionResult<DBReturn> AddIncome(Income income)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.AddIncome(income);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - Post(income) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

            return dBReturn;

        }

        [HttpPut]
        public ActionResult<DBReturn> UpdateIncome(Income income)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.UpdateIncome(income);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - UpdateIncome(income) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

        }

        [HttpDelete("{id}")]
        public ActionResult<DBReturn> DeleteIncome(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = incomeBL.DeleteIncome(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Income - DeleteIncome(id) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

    }
}
