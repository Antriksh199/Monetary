using AdminController.DL.Entities;

namespace AdminController.DL.contracts
{
    public interface IPaymentMethodDL
    {
        List<PaymentMethod> GetPaymentMethods();
        PaymentMethod GetPaymentMethodById(int id);

        int AddPaymentMethod(PaymentMethod PaymentMethod);

        PaymentMethod UpdatePaymentMethod(PaymentMethod PaymentMethod);

        PaymentMethod DeletePaymentMethod(int id);

        AddPaymentMethod AddUserPaymentMethod(AddPaymentMethod AddPaymentMethod);

        UserPaymentMethodsWrapper GetAllUserPaymentMethods(int userId);
    }
}
