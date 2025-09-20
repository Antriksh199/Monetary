using System.Reflection;
using System.Transactions;

using AdminController.DL.contracts;
using AdminController.DL.Entities;
using AdminController.DL.Implementation;

using Microsoft.AspNetCore.Mvc;

using NHibernate;
using static AdminController.DL.NHibernateHelper;
using NHibernate.Linq;
using System.Text.Json;


namespace AdminController.DL.Implementation
{
    public class PaymentMethodDL : IPaymentMethodDL
    {

        public List<PaymentMethod> GetPaymentMethods()
        {
            List<PaymentMethod> list = new List<PaymentMethod>();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    list = session.Query<PaymentMethod>().ToList();
                }
            }
            return list;
        }

        public PaymentMethod GetPaymentMethodById(int id)
        {
            PaymentMethod f = new PaymentMethod();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<PaymentMethod>(id);
                }
            }
            return f;
        }

        public int AddPaymentMethod(PaymentMethod PaymentMethod)
        {
            int id;
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    PaymentMethod.CreatedDate = Helper.GetISTDate(PaymentMethod.CreatedDate);
                    PaymentMethod.ModifiedDate = Helper.GetISTDate(PaymentMethod.ModifiedDate);
                    id = (int)session.Save(PaymentMethod);
                    transaction.Commit();
                }

            }
            return id;

        }

        public PaymentMethod UpdatePaymentMethod(PaymentMethod PaymentMethod)
        {
            PaymentMethod f = new PaymentMethod();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    PaymentMethod.CreatedDate = Helper.GetISTDate(PaymentMethod.CreatedDate);
                    PaymentMethod.ModifiedDate = Helper.GetISTDate(PaymentMethod.ModifiedDate);
                    session.Update(f);
                    transaction.Commit();

                }

            }
            return f;

        }

        public PaymentMethod DeletePaymentMethod(int id)
        {
            PaymentMethod f = new PaymentMethod();
            using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    f = session.Get<PaymentMethod>(id);
                    session.Delete(f);
                    transaction.Commit();

                }
            }
            return f;

        }

        public AddPaymentMethod AddUserPaymentMethod(AddPaymentMethod card)
        {
            AddPaymentMethod newPayment = new AddPaymentMethod();
            try
            {
                if(card.PaymentMethod != null)
                {
                    if (card.PaymentMethod == "Credit Card" || card.PaymentMethod == "Debit Card")
                    {
                        newPayment.Card = new Card();
                        card.Card.CreatedDate = Helper.GetISTDate(card.Card.CreatedDate);
                        card.Card.ModifiedDate = Helper.GetISTDate(card.Card.ModifiedDate);
                        using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                        {
                            using (ITransaction transaction = session.BeginTransaction())
                            {
                                int newRecordId = (int)session.Save(card.Card);
                                transaction.Commit();
                                newPayment.Card = session.Get<Card>(newRecordId);

                            }
                        }
                    }
                    else if (card.PaymentMethod == "Bank Transfer")
                    {
                        newPayment.Bank = new Bank();
                        card.Bank.CreatedDate = Helper.GetISTDate(card.Bank.CreatedDate);
                        card.Bank.ModifiedDate = Helper.GetISTDate(card.Bank.ModifiedDate);
                        using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                        {
                            using (ITransaction transaction = session.BeginTransaction())
                            {
                                card.Bank.BankName = card.Bank.BankName.ToUpper();
                                int newRecordId = (int)session.Save(card.Bank);
                                transaction.Commit();
                                newPayment.Bank = session.Get<Bank>(newRecordId);

                            }
                        }
                    }

                    else if (card.PaymentMethod == "UPI")
                    {
                        newPayment.UPI = new UPI();
                        using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                        {
                            using (ITransaction transaction = session.BeginTransaction())
                            {
                                card.UPI.CreatedDate = Helper.GetISTDate(card.UPI.CreatedDate);
                                card.UPI.ModifiedDate = Helper.GetISTDate(card.UPI.ModifiedDate);
                                int newRecordId = (int)session.Save(card.UPI);
                                transaction.Commit();
                                newPayment.UPI = session.Get<UPI>(newRecordId);

                            }
                        }
                    }

                    else if (card.PaymentMethod == "Cash")
                    {
                        newPayment.Cash = new Cash();
                        card.Cash.CreatedDate = Helper.GetISTDate(card.Cash.CreatedDate);
                        card.Cash.ModifiedDate = Helper.GetISTDate (card.Cash.ModifiedDate);
                        using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                        {
                            using (ITransaction transaction = session.BeginTransaction())
                            {
                                int newRecordId = (int)session.Save(card.Cash);
                                transaction.Commit();
                                newPayment.Cash = session.Get<Cash>(newRecordId);

                            }
                        }
                    }


                }

                
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }

            return newPayment;

        }

        public UserPaymentMethodsWrapper GetAllUserPaymentMethods(int userId)
        {
            UserPaymentMethodsWrapper upm= new UserPaymentMethodsWrapper();
            try
            {
                using (NHibernate.ISession session = AdminController.DL.NHibernateHelper.OpenSession())
                {
                    using (ITransaction transaction = session.BeginTransaction())
                    {

                        string cardQuery = @"select c from Card c join fetch c.UPaymentMethod upm join fetch upm.User u join fetch upm.PaymentMethod where u.Id = :userId order by c.CardType, c.ModifiedDate desc";
                        string bankQuery = @"select c from Bank c join fetch c.UPaymentMethod upm join fetch upm.User u join fetch upm.PaymentMethod where u.Id = :userId order by c.ModifiedDate desc";
                        string upiQuery =  @"select c from UPI c join fetch c.UPaymentMethod upm join fetch upm.User u join fetch upm.PaymentMethod where u.Id = :userId order by c.ModifiedDate desc";
                        string cashQuery = @"select c from Cash c join fetch c.UPaymentMethod upm join fetch upm.User u join fetch upm.PaymentMethod where u.Id = :userId order by c.ModifiedDate desc";

                        upm.Cards = session.CreateQuery(cardQuery).SetParameter("userId", userId).List<Card>();
                        upm.Banks = session.CreateQuery(bankQuery).SetParameter("userId", userId).List<Bank>();
                        upm.Upis = session.CreateQuery(upiQuery).SetParameter("userId", userId).List<UPI>();
                        upm.Cash = session.CreateQuery(cashQuery).SetParameter("userId", userId).List<Cash>();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return upm;

        }

    }
}
