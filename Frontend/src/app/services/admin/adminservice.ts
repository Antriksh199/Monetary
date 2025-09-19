import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ApiEndpoints } from '../../constants.js';
import { DBReturn } from '../../models/DBReturn.js';
import { ExpenseCategory } from '../../models/Admin/ExpenseCategory.js';
import { ExpenseType } from '../../models/Admin/ExpenseType.js';
import { InvestmentCategory } from '../../models/Admin/InvestmentCategory.js';
import { InvestmentType } from '../../models/Admin/InvestmentType.js';
import { User } from '../../models/Admin/user.js';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Adminservice {

  constructor(private http: HttpClient){}

  url: any;

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Backend/server error
      errorMessage = `Server returned code: ${error.status}, ` +
                     `body was: ${JSON.stringify(error.error)}`;
    }

    // Optionally log error to console or remote logging service
    console.error(errorMessage);

    // Rethrow as a user-friendly message or custom error
    return throwError(() => new Error(errorMessage));
  }

    //#region Frequency 

  getFrequencies(): Observable<any> 
   {

    this.url = ApiEndpoints.admin.host+ApiEndpoints.admin.frequency;
    try{
      const result$ = this.http.get<any>(this.url).pipe(
        map((x)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
      }
      catch(error){
        console.error('Error in getting frequencies - ',error);
      }
      return of();
    }

    addFrequency() {}

    updateFrequency() { }

    deleteFrequency() {}

    getFrequencyById(){}

    //#endregion
    

    //#region Payment Methods

    getDefaultPaymentMethods(): Observable<any> 
    {
      try{
        this.url = ApiEndpoints.admin.host+ApiEndpoints.admin.paymentMethod.route;
        const result$ = this.http.get<any>(this.url).pipe(
          map((x)=> {return x.result}), catchError(this.handleError)
        );
        return result$;
        }
        catch(error){
          console.error('Error in getting default payment methods ',error);
        }
        return of();

    }

    getUserPaymentMethods(id: number)
      {
        try{
          this.url = ApiEndpoints.admin.host+ApiEndpoints.admin.paymentMethod.route+ApiEndpoints.admin.paymentMethod.getPaymentMethod.getall+id;
          const result$ = this.http.get<any>(this.url).pipe(
            map((x)=> {return x.result}), catchError(this.handleError)
          );
          return result$;
          }
          catch(error){
            console.error('Error in getting user payment methods ',error);
          }
          return of();

      }

      addUserPaymentMethod(value: any)
      {
        try
        {
          if(value)
          {
            this.url = ApiEndpoints.admin.host+ApiEndpoints.admin.paymentMethod.route+ApiEndpoints.admin.paymentMethod.addPaymentMethod;
            const result$ = this.http.post<any>(this.url, value).pipe(
              map((x)=> {return x.result}), catchError(this.handleError)
            );
            return result$;
          }
        }
        catch(error)
        {
          console.error('Error in adding User Method - ', error)
        }
        return of();
      }

      //#endregion Payment Methods


    //#region Income Types

    getIncomeTypes(): Observable<any> {

      try{
        this.url = ApiEndpoints.admin.host+ApiEndpoints.admin.incometype
        const result$ = this.http.get<any>(this.url).pipe(
          map((x)=> {return x.result}), catchError(this.handleError)
        );
        return result$;
        }
        catch(error){
          console.error('Error in getting Income Types - ',error);
        }
        return of();
      }

      addIncomeType() {}

      updateIncomeType() { }
  
      deleteIncomeType() {}
  
      getIncomeTypeById(){}

        //#endregion
      

    //#region User

      getUserById(id: number)
      {
        try
        {
          this.url = ApiEndpoints.admin.host+ApiEndpoints.admin.user.route+id;
          return this.http.get<User>(ApiEndpoints.admin.host+ApiEndpoints.admin.user+id);
          }
          catch(error){
            console.error("Error in service while getting user by Id - ",error);
          }
          return of();
      }

      getUserbyUsername(username: string): Observable<User>
      {
        try
          {
          this.url = ApiEndpoints.admin.host + ApiEndpoints.admin.user.route + ApiEndpoints.admin.user.username+username;
          const result$ = this.http.get<any>(this.url).pipe(
            map((x)=> {return x.result}), catchError(this.handleError)
          );
          return result$;
          }
        catch(error)
        {
          console.error('Error in service while getting user by username - ', error);
        }
        return of();
      }

    addUser(user: User)  : Observable<User>
    {
      try
          {
          this.url = ApiEndpoints.admin.host + ApiEndpoints.admin.user.route;
          const result$ = this.http.post<any>(this.url, user).pipe(
            map((x)=> {return x.result}), catchError(this.handleError)
          );
          return result$;
          }
        catch(error)
        {
          console.error('Error in service while adding user - ', error);
        }
        return of();
      }

    updateUser() { }

    deleteUser() {}
  

    //#endregion

    //#region Expense

    //#region expenseCategory

      getExpenseCategories(): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.expense.expenseCategory;
          this.http.get<DBReturn>(this.url).pipe(
            map((x: DBReturn) => {
              return x.result;
            }), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while fetching categories ',error);
        }
        return of();
      }

      addExpenseCategory(exc: ExpenseCategory): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.expense.expenseCategory;
          this.http.post<DBReturn>(this.url, exc).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while adding Expense Category ',error);
        }
        return of();
      }

      updateExpenseCategory(exc: ExpenseCategory): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.expense.expenseCategory;
          this.http.put<DBReturn>(this.url, exc).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while updating Expense Category ',error);
        }
        return of();
      }

      deleteExpenseCategory(id: number): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.expense.expenseCategory+id;
          this.http.delete<DBReturn>(this.url).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while updating Expense Category ',error);
        }
        return of();
      }

    //#endregion expenseCategory

    //#region expenseType

      getExpenseTypes(): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.expense.host+ApiEndpoints.admin.expense.expenseType;
          this.http.get<DBReturn>(this.url).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );

        }
        catch(error){
          console.error('Error while fetching categories ',error);
        }
        return of();
      }

      addExpenseType(exc: ExpenseType): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.expense.host+ApiEndpoints.admin.expense.expenseType;
          this.http.post<DBReturn>(this.url, exc).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while adding Expense Category ',error);
        }
        return of();
      }

      updateExpenseType(exc: ExpenseType): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.expense.host+ApiEndpoints.admin.expense.expenseType;
          this.http.put<DBReturn>(this.url, exc).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while updating Expense Category ',error);
        }
        return of();
      }

      deleteExpenseType(id: number): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.expense.host+ApiEndpoints.admin.expense.expenseType+id;
          this.http.delete<DBReturn>(this.url).pipe(
            map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
          );
        }
        catch(error){
          console.error('Error while updating Expense Category ',error);
        }
        return of();
      }

    //#endregion expenseType

    //#region categoryType

    getExpenseCategoryType(): Observable<any>
      {
        try
        {
          this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.expense.controller+ApiEndpoints.admin.expense.expenseCategoryType;
          const res$ = this.http.get<DBReturn>(this.url).pipe(
            map((x) => {return x.result; } ), catchError(this.handleError)
          );
          return res$;
        }
        catch(error){
          console.error('Error while updating Expense Category ',error);
        }
        return of();
      }

    //#endregion

    //#endregion Expense

    //#region Investment

    //#region investmentCategory

    getInvestmentCategories(): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentCategory;
        this.http.get<DBReturn>(this.url).pipe(
          map((x: DBReturn) => {
            return x.result;
          }), catchError(this.handleError)
        );

      }
      catch(error){
        console.error('Error while fetching categories ',error);
      }
      return of();
    }

    addInvestmentCategory(exc: InvestmentCategory): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentCategory;
        this.http.post<DBReturn>(this.url, exc).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );
      }
      catch(error){
        console.error('Error while adding Investment Category ',error);
      }
      return of();
    }

    updateInvestmentCategory(exc: InvestmentCategory): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentCategory;
        this.http.put<DBReturn>(this.url, exc).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );
      }
      catch(error){
        console.error('Error while updating Investment Category ',error);
      }
      return of();
    }

    deleteInvestmentCategory(id: number): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentCategory+id;
        this.http.delete<DBReturn>(this.url).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );
      }
      catch(error){
        console.error('Error while updating Investment Category ',error);
      }
      return of();
    }

  //#endregion investmentCategory

  //#region investmentType

    getInvestmentTypes(): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentType;
        this.http.get<DBReturn>(this.url).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );

      }
      catch(error){
        console.error('Error while fetching categories ',error);
      }
      return of();
    }

    addInvestmentType(exc: InvestmentType): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentType;
        this.http.post<DBReturn>(this.url, exc).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );
      }
      catch(error){
        console.error('Error while adding Investment Category ',error);
      }
      return of();
    }

    updateInvestmentType(exc: InvestmentType): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentType;
        this.http.put<DBReturn>(this.url, exc).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );
      }
      catch(error){
        console.error('Error while updating Investment Category ',error);
      }
      return of();
    }

    deleteInvestmentType(id: number): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.investmentType+id;
        this.http.delete<DBReturn>(this.url).pipe(
          map((x: DBReturn) => {return x.result} ), catchError(this.handleError)
        );
      }
      catch(error){
        console.error('Error while updating Investment Category ',error);
      }
      return of();
    }

  //#endregion investmentType

  //#region categoryType

  getInvestmentCategoryType(): Observable<any>
    {
      try
      {
        this.url =  ApiEndpoints.admin.host+ApiEndpoints.admin.investment.controller+ApiEndpoints.admin.investment.investmentCategoryType;
        const res$ = this.http.get<DBReturn>(this.url).pipe(
          map((x) => { return x.result; } ), catchError(this.handleError)
        );
        return res$;
      }
      catch(error){
        console.error('Error while updating Investment Category ',error);
      }
      return of();
    }

  //#endregion

  //#endregion Investment
  
}
