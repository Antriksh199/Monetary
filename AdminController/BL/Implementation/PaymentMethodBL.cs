using AdminController.BL.Contracts;
using AdminController.DL.contracts;
using AdminController.DL.Entities;
using AdminController.DL.Implementation;

namespace AdminController.BL.Implementation
{
    public class PaymentMethodBL : IPaymentMethodBL
    {
        public IConfiguration _configuration;

        public IPaymentMethodDL _PaymentMethodDL;

        public PaymentMethodBL(IPaymentMethodDL fDL, IConfiguration Configuration)
        {
            _configuration = Configuration;
            _PaymentMethodDL = fDL;
        }

        public List<PaymentMethod> GetPaymentMethods()
        {
            return _PaymentMethodDL.GetPaymentMethods();
        }

        public PaymentMethod GetPaymentMethodById(int id)
        {
            return _PaymentMethodDL.GetPaymentMethodById(id);
        }

        public int AddPaymentMethod(PaymentMethod PaymentMethod)
        {
            int id = _PaymentMethodDL.AddPaymentMethod(PaymentMethod);
            return id;
        }

        public PaymentMethod UpdatePaymentMethod(PaymentMethod PaymentMethod)
        {
            PaymentMethodDL dL = new PaymentMethodDL();
            return dL.UpdatePaymentMethod(PaymentMethod);
        }

        public PaymentMethod DeletePaymentMethod(int id)
        {
            return _PaymentMethodDL.DeletePaymentMethod(id);
        }

        public AddPaymentMethod AddUserPaymentMethod(AddPaymentMethod AddPaymentMethod)
        {
            return _PaymentMethodDL.AddUserPaymentMethod(AddPaymentMethod);
        }

        public UserPaymentMethodsWrapper GetAllUserPaymentMethods(int userId)
        {
            return _PaymentMethodDL.GetAllUserPaymentMethods(userId);
        }
    }
}

