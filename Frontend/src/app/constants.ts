export const ApiEndpoints = {

    admin: {
        host:  "http://localhost:5176/api/admin/",
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
      host:  "http://localhost:5048/api/income/",
      endpoints: {
        userIncomes: "userincomes/",
        latest:'latest/',
      }
    },

    expense: {
      host: "http://localhost:5048/api/expense/",
      endpoints:
      {
        userExpenses: "userexpenses/",
        latest:'latest/',
      }
    },

    investments: {
      host: "http://localhost:5048/api/investment/",
      endpoints:
      {
        userInvestment: "userinvestments/",
        latest:'latest/',
      }
    }


}