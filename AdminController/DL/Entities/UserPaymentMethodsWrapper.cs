namespace AdminController.DL.Entities
{
    public class UserPaymentMethodsWrapper
    {
        public virtual IList<Card> Cards { get; set; } = [];

        public virtual IList<Bank> Banks { get; set; } = [];

        public virtual IList<UPI> Upis { get; set; } = [];

        public virtual IList<Cash> Cash { get; set; } = [];

    }
}
