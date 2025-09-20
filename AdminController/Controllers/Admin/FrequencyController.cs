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
    public class FrequencyController : Controller
    {
        private readonly IFrequencyBL frequencyBL;

        //private static readonly ILog //_logger = LogManager.GetLogger(typeof(FrequencyController));

        public FrequencyController(IFrequencyBL _frequencyBL) {

            frequencyBL = _frequencyBL;
        }
        [HttpGet]
        public ActionResult<DBReturn> Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = frequencyBL.GetFrequencies();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Frequency - Get() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Frequency - Get() Failed with error "+ex.Message.ToString();
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
                dBReturn.result = frequencyBL.GetFrequencyById(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("Frequency - Get(id) completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Frequency - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

        [HttpPost]
        public ActionResult<DBReturn> Post(Frequency frequency)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = frequencyBL.AddFrequency(frequency);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 201;
                //_logger.Info("Frequency - Post() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Frequency - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

        [HttpPut]
        public ActionResult<DBReturn> Put(Frequency frequency)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = frequencyBL.UpdateFrequency(frequency);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("Frequency - Put() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Frequency - Failed with error "+ex.Message.ToString();
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
                dBReturn.result = frequencyBL.DeleteFrequency(id);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("Frequency - Delete() completed !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "Frequency - Delete(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }


    }
}
