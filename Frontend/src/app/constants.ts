export const ApiEndpoints = {

    admin: {
        host: "/api/admin/",
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
      host:  "/api/features/income/",
      endpoints: {
        userIncomes: "userincomes/",
        latest:'latest/',
      }
    },

    expense: {
      host: "/api/features/expense/",
      endpoints:
      {
        userExpenses: "userexpenses/",
        latest:'latest/',
      }
    },

    investments: {
      host: "/api/features/investment/",
      endpoints:
      {
        userInvestment: "userinvestments/",
        latest:'latest/',
      }
    }


}