export const ApiEndpoints = {

    admin: {
        host:  "https://05le12tlh0.execute-api.us-east-1.amazonaws.com/v1/api/admin/",
        user: 
        {
          route: "User/",
          username: "username/",
        },
        incometype: "IncomeType",
        frequency: "Frequency",
        paymentMethod: { 
          route: "PaymentMethod/",
          addPaymentMethod : "userpayment",
          getPaymentMethod: {
            getall:"all/"
          }
        },
          expense:{
        controller:"Expense/",
        expenseCategory: "expensecategory/",
        expenseType: "expensetype/",
        expenseCategoryType: "expensecategorytype/"
      },

      investment: {
        controller: 'Investment/',
        investmentCategory: "investmentcategory/",
        investmentType: "investmenttype/",
        investmentCategoryType: "investmentcategorytype/"
      }
        
    },

    income: {
      host:  "https://05le12tlh0.execute-api.us-east-1.amazonaws.com/v1/api/features/income/",
      endpoints: {
        userIncomes: "userincomes/",
        latest:'latest/',
      }
    },

    expense: {
      host: "https://05le12tlh0.execute-api.us-east-1.amazonaws.com/v1/api/features/expense/",
      endpoints:
      {
        userExpenses: "userexpenses/",
        latest:'latest/',
      }
    },

    investments: {
      host: "https://05le12tlh0.execute-api.us-east-1.amazonaws.com/v1/api/features/investment/",
      endpoints:
      {
        userInvestment: "userinvestments/",
        latest:'latest/',
      }
    }


}