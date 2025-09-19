import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';
import { DBReturn } from '../../models/DBReturn.js';
import { ApiEndpoints } from '../../constants.js';
import { catchError } from 'rxjs/operators';
import { Investment } from '../../models/Investments/Investment.js';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  /**
   *
   */
  constructor(private http: HttpClient) {
  }

  url='';

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

    // Rethrow as a user-friendly message or custom error
    return throwError(() => new Error(errorMessage));
  }
  
  addinvestment(ex: Investment) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.investments.host;
      const result$ = this.http.post<any>(this.url,ex).pipe(
        map((x)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while adding investment - ', error);
    }
    return of();
  }

  getInvestmentById(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.investments.host+ex;
      const result$ = this.http.get<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while fetching investment - ', error);
    }
    return of();
  }

  getAllInvestmentsforUser(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.investments.host+ApiEndpoints.investments.endpoints.userInvestment+ex;
      const result$ = this.http.get<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while fetching investment - ', error);
    }
    return of();
  }

  getLatestInvestmentsforUser(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.investments.host+ApiEndpoints.investments.endpoints.latest+ex;
      const result$ = this.http.get<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while fetching latest investment - ', error);
    }
    return of();
  }

  updateInvestment(ex: Investment) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.investments.host;
      const result$ = this.http.put<DBReturn>(this.url, ex).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while updating investment - ', error);
    }
    return of();
  }

  deleteInvestment(ex: number) : Observable<any>
  {
    try
    {
      this.url = ApiEndpoints.investments.host+ex;
      const result$ = this.http.delete<DBReturn>(this.url).pipe(
        map((x: DBReturn)=> {return x.result}), catchError(this.handleError)
      );
      return result$;
    }
    catch(error)
    {
      console.error('Error in service while deleting investment - ', error);
    }
    return of();
  }
  
}
