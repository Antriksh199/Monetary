using AdminController.BL.Contracts;
using AdminController.DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminController.Controllers.Admin
{
    [Authorize]
    [Area("admin")]
    [Route("api/[Area]/[controller]")]
    public class IncomeTypeController : Controller
    {
        //private static readonly ILog //_logger = LogManager.GetLogger(typeof(IncomeTypeController));
        private readonly IIncomeTypeBL IncomeTypeBL;

        public IncomeTypeController(IIncomeTypeBL _IncomeTypeBL)
        {

            IncomeTypeBL = _IncomeTypeBL;
        }
        [HttpGet]
        public ActionResult<DBReturn> Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = IncomeTypeBL.GetIncomeTypes();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("IncomeType - Get() completed !");
                return Ok(dBReturn);
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "IncomeType - Get() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<DBReturn> Get(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = IncomeTypeBL.GetIncomeTypeById(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("IncomeType - Get(id) completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "IncomeType - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

        [HttpPost]
        public ActionResult<DBReturn> Post(IncomeType IncomeType)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = IncomeTypeBL.AddIncomeType(IncomeType);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 201;
                //_logger.Info("IncomeType - Post completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "IncomeType - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

        [HttpPut]
        public ActionResult<DBReturn> Put(IncomeType IncomeType)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = IncomeTypeBL.UpdateIncomeType(IncomeType);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("IncomeType - Put() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "IncomeType - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<DBReturn> Delete(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = IncomeTypeBL.DeleteIncomeType(id);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("IncomeType - Delete() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "IncomeType - Delete(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

    }
}
