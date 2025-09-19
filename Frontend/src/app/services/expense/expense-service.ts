import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { DBReturn } from '../../models/DBReturn.js';
import { ApiEndpoints } from '../../constants.js';
import { Expense } from '../../models/Expense/expense.js';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  constructor(private http: HttpClient) {
    
  }
  
  url = '';

  // Error handler method
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

  addexpense(ex: Expense) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.expense.host;
      const result$ = this.http.post<any>(this.url,ex).pipe(
        map((x)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while adding expense - ', error);
    }
    return of();
  }

  getExpenseById(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.expense.host+ex;
      const result$ = this.http.get<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while fetching expense - ', error);
    }
    return of();
  }

  getAllExpensesforUser(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.expense.host+ApiEndpoints.expense.endpoints.userExpenses+ex;
      const result$ = this.http.get<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while fetching expense - ', error);
    }
    return of();
  }


  getLatestExpensesforUser(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.expense.host+ApiEndpoints.expense.endpoints.latest+ex;
      const result$ = this.http.get<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while fetching expense - ', error);
    }
    return of();
  }

  updateExpense(ex: Expense) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.expense.host;
      const result$ = this.http.put<DBReturn>(this.url, ex).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while updating expense - ', error);
    }
    return of();
  }

  deleteExpense(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.expense.host+ex;
      const result$ = this.http.delete<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while deleting expense - ', error);
    }
    return of();
  }

}
