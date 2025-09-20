using AdminController.BL.Contracts;
using AdminController.DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminController.Controllers.Admin
{
    [Authorize]
    [Area("admin")]
    [Route("api/[Area]/[controller]")]
    [ApiController]
    public class InvestmentController : Controller
    {
        private readonly IInvestmentBL investmentBL;

        public InvestmentController(IInvestmentBL investmentBL)
        {
            this.investmentBL = investmentBL;
        }

        [HttpGet("investmentcategory/{id}")]
        public ActionResult<DBReturn> GetInvestmentCategoryById(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestmentCategory(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - GetInvestmentCategory() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "InvestmentCategory - GetInvestmentCategory() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("investmentcategorytype")]
        public ActionResult<DBReturn> GetInvestmentCategoryType()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetAllCategoryTypes();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - GetInvestmentCategoryType() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - GetInvestmentCategoryType() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("investmentcategory")]
        public ActionResult<DBReturn> GetInvestmentCategories()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestmentCategories();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - GetInvestmentCategories() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - GetInvestmentCategories() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPut("investmentcategory")]
        public ActionResult<DBReturn> UpdateInvestmentCategory(InvestmentCategory ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.UpdateInvestmentCategory(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - UpdateInvestmentCategory() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - UpdateInvestmentCategory() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost("investmentcategory")]
        public ActionResult<DBReturn> AddInvestmentCategory(InvestmentCategory ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.AddInvestmentCategory(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - AddInvestmentCategory() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - AddInvestmentCategory() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("investmenttype/{id}")]
        public ActionResult<DBReturn> GetInvestmentTypeById(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestmentType(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - GetInvestmentTypeById() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - GetInvestmentTypeById() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("investmenttype")]
        public ActionResult<DBReturn> GetInvestmentTypes()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.GetInvestmentTypes();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - GetInvestmentTypes() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - GetInvestmentTypes() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
            return dBReturn;
        }

        [HttpPut("investmenttype")]
        public ActionResult<DBReturn> UpdateInvestmentType(InvestmentType ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.UpdateInvestmentType(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - UpdateInvestmentType() completed!");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Investment - UpdateInvestmentType() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost("investmenttype")]
        public ActionResult<DBReturn> AddInvestmentType(InvestmentType ec)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = investmentBL.AddInvestmentType(ec);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Investment - AddInvestmentType() completed!");
                return Ok(dBReturn);

            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "InvestmentType - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }
    }
}
