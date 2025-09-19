import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { Income } from '../../models/Income/income.js';
import { DBReturn } from '../../models/DBReturn.js';
import { ApiEndpoints } from '../../constants.js';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient)
  {}

  url = ''

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

  getallIncomes(): Observable<any> {

    try{
    return this.http.get<any>(this.url+'incomes');
    }
    catch(error){
      console.error(error);
    }
    return of();
  }

  getlatestIncomeforUser(id: number): Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.income.host+ApiEndpoints.income.endpoints.latest+id;
      const response$ = this.http.get<DBReturn>(this.url).pipe(
        map((x) => { return x.result }), catchError(this.handleError)
      );
      return response$;
    }
    catch(err) 
    {
      console.error('Error in getting Income for user', err);
    }
    return of();
  }

  getIncomesforUser(id: number): Observable<any> {
    try{

      this.url = ApiEndpoints.income.host+ApiEndpoints.income.endpoints.userIncomes+id;
      const response$ = this.http.get<DBReturn>(this.url).pipe(
        map((x) => { return x.result }), catchError(this.handleError)
      );
      return response$;
    }
    catch(err) 
    {
      console.error('Error in getting Income for user', err);
    }
    return of();
  }

  addNewIncome(income: Income): Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.income.host;
      const response$ = this.http.post<DBReturn>(this.url, income).pipe(
        map((x) => { return x.result }), catchError(this.handleError)
      );
      return response$;
    }
    catch(err)
    {
      console.error('Error in adding Income ', err);
    }

    return of();
  }

  editIncome(income: Income): Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.income.host;
      const response$ = this.http.put<DBReturn>(this.url, income).pipe(
        map((x) => { return x.result }), catchError(this.handleError)
      );
      return response$;
    }
    catch(err)
    {
      console.error('Error in adding Income ', err);
    }

    return of();
  }

  deleteIncome(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.income.host+ex;
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
  

