using AdminController.DL.Entities;

namespace AdminController.BL.Contracts
{
    public interface IPaymentMethodBL
    {
        List<PaymentMethod> GetPaymentMethods();
        PaymentMethod GetPaymentMethodById(int Id);
        int AddPaymentMethod(PaymentMethod PaymentMethod);
        PaymentMethod UpdatePaymentMethod(PaymentMethod PaymentMethod);
        PaymentMethod DeletePaymentMethod(int id);
        AddPaymentMethod AddUserPaymentMethod (AddPaymentMethod AddPaymentMethod);

        UserPaymentMethodsWrapper GetAllUserPaymentMethods(int userId);
    }
}
