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
    public class PaymentMethodController : Controller
    {
        //private static readonly ILog //_logger = LogManager.GetLogger(typeof(PaymentMethodController));
        private readonly IPaymentMethodBL PaymentMethodBL;

        public PaymentMethodController(IPaymentMethodBL _PaymentMethodBL)
        {

            PaymentMethodBL = _PaymentMethodBL;
        }
        [HttpGet]
        public ActionResult<DBReturn> Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = PaymentMethodBL.GetPaymentMethods();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("PaymentMethod - Get() completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "PaymentMethod - Get() Failed with error "+ex.Message.ToString();
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
                dBReturn.result = PaymentMethodBL.GetPaymentMethodById(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("PaymentMethod - Get(id) completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "PaymentMethod - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

        [HttpPost]
        public ActionResult<DBReturn> Post(PaymentMethod PaymentMethod)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = PaymentMethodBL.AddPaymentMethod(PaymentMethod);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 201;
                //_logger.Info("PaymentMethod - Post() completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "PaymentMethod - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPut]
        public ActionResult<DBReturn> Put(PaymentMethod PaymentMethod)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = PaymentMethodBL.UpdatePaymentMethod(PaymentMethod);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("PaymentMethod - Put() completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "PaymentMethod - Failed with error "+ex.Message.ToString();
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
                dBReturn.result = PaymentMethodBL.DeletePaymentMethod(id);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("PaymentMethod - Delete() completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "PaymentMethod - Delete(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost("userpayment")]
        public ActionResult<DBReturn> AddUserPaymentMethod(AddPaymentMethod addUserPayment)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = PaymentMethodBL.AddUserPaymentMethod(addUserPayment);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("PaymentMethod - AddUserPaymentMethod() completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "PaymentMethod - AddUserPaymentMethod() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpGet("all/{id}")]
        public ActionResult<DBReturn> GetAllUserPaymentMethods(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = PaymentMethodBL.GetAllUserPaymentMethods(id);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("PaymentMethod - AddUserPaymentMethod() completed ! ");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "AddUserCard - POST Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }
    }

    }

