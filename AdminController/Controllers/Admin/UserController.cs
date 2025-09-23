using System.Data.SqlTypes;
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
    public class UserController : Controller
    {
        private readonly IUserBL UserBL;
        //private static readonly ILog //_logger = LogManager.GetLogger(typeof(UserController));
        public UserController(IUserBL _UserBL)
        {

            UserBL = _UserBL;
        }
        [HttpGet]
        public ActionResult<DBReturn> Get()
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = UserBL.GetUsers();
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("User - Get() execution complete !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "User - Get() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }


        [HttpGet("username/{username}")]
        public ActionResult<DBReturn> GetUserByUsername(string username)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = UserBL.GetUserByUsername(username);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("User - GetUserByUsername(username) execution complete !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "User - GetUserByUsername(username) Failed with error "+ex.Message.ToString();
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
                dBReturn.result = UserBL.GetUserById(id);
                dBReturn.status = "Success";
                dBReturn.Code = 200;
                //_logger.Info("User - Get(Id) Complete !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "User - Get(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }
        }

        [HttpPost]
        public ActionResult<DBReturn> Post([FromBody] User User)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = UserBL.AddUser(User);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 201;
                //_logger.Info("User - Post Complete !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "User - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }

        [HttpPut]
        public ActionResult<DBReturn> Put(User User)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = UserBL.UpdateUser(User);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("User - Put Complete !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "User - Post() Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

            return dBReturn;
        }

        [HttpDelete("{id}")]
        public ActionResult<DBReturn> Delete(int id)
        {
            DBReturn dBReturn = new DBReturn();
            try
            {
                dBReturn.result = UserBL.DeleteUser(id);
                dBReturn.status = "SUCCESS";
                dBReturn.Code = 204;
                //_logger.Info("User - Delete Complete !");
                return Ok(dBReturn);
            }
            catch (Exception ex)
            {
                dBReturn.status = "FAILED";
                dBReturn.ErrorMsg = "User - Delete(id) Failed with error "+ex.Message.ToString();
                dBReturn.Code = 500;
                //_logger.Error(dBReturn.ErrorMsg);
                return StatusCode(500, dBReturn);
            }

        }
    }
}
