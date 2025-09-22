using Features.BL.Contracts;
using Features.DL.Entities;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Features.Controllers
{
    [Authorize]
    [Area("investment")]
    [Route("api/[controller]")]
    [ApiController]
    public class InvestmentController : Controller
    {
        private readonly IInvestmentBL investmentBL;

        public InvestmentController(IInvestmentBL investmentBL)
        {
            this.investmentBL=investmentBL;
        }

        [HttpGet]
        public ActionResult<DBReturn> Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestments();
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - Get() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

        }

        [HttpGet("latest/{id}")]
        public ActionResult<DBReturn> GetLatestInvestment(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetLatestInvestment(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - GetLatestInvestment() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("userinvestments/{userId}")]
        public ActionResult<DBReturn> GetInvestmentsforUser(int userId)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestmentsforUser(userId);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - GetInvestmentsforUser() Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("id")]
        public ActionResult<DBReturn> Get(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestmentById(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost]
        public ActionResult<DBReturn> AddInvestment(Investment investment)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.AddInvestment(investment);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - Post(investment) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPut]
        public ActionResult<DBReturn> UpdateInvestment(Investment investment)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.UpdateInvestment(investment);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - UpdateInvestment(investment) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

        }

        [HttpDelete("{id}")]
        public ActionResult<DBReturn> DeleteInvestment(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.DeleteInvestment(id);
                dBReturn.status = "Success";
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - DeleteInvestment(id) Failed with error "+ex.Message.ToString();
                dBReturn.InnerException = ex.InnerException.ToString();
                return StatusCode(500, dBReturn);
            }

        }
    }
}
