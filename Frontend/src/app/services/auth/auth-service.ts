import { Injectable } from '@angular/core';
import { BehaviorSubject, of, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SignInInput, fetchAuthSession, signOut, signIn, signUp, confirmSignUp, resetPassword, ResetPasswordInput } from 'aws-amplify/auth';
import { SessionService } from '../session/session-service.js';
import { Inject, PLATFORM_ID } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { CognitoUser } from '../../models/Admin/CognitoUser.js';
import { Adminservice } from '../admin/adminservice.js';
import { User } from '../../models/Admin/user.js';
import { throwError, tap, Observable, switchMap } from 'rxjs';
import { CustomError } from './custom-error.js';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private x: number = 1;
  private userSubject = new BehaviorSubject<any>(null); 
  public user$ = this.userSubject.asObservable();

  //For Amplify
  private _isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this._isLoading.asObservable();

  public dbUser: any;
  cognitoUser: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private toastr: ToastrService,
   http: HttpClient, private ss: SessionService, private as: Adminservice) {
    const currentUser = this.userSubject.getValue();
    if(currentUser)
    {
      this.userSubject.next(currentUser);
    }
    else
    {
      this.checkOnAppLoad();
    }
  }

  async login(signInInput: SignInInput): Promise<void> {
      this._isLoading.next(true); 
      this.ss.deleteAll();
      try {
        const { nextStep } = await signIn(signInInput);

        switch(nextStep.signInStep)
        {
          case 'DONE':
            let tokens;
            try
            {
              tokens = await fetchAuthSession();
            }
            catch {
              throw new CustomError('NotAuthorizedException', 'Incorrect username or password');
            }
    
            const idToken = tokens?.tokens?.idToken;
            if (!idToken) {
              throw new CustomError('NotAuthorizedException', 'Incorrect username or password');
            }
    
            this.ss.setItem("idToken", idToken.toString());
            this.dbUser = await firstValueFrom(this.getUserfromDataBase(idToken.toString()));
            this.userSubject.next(this.dbUser);
            break;
          case 'CONFIRM_SIGN_UP':
              throw new CustomError('UserNotConfirmedException', 'User account is not confirmed.');

            case 'RESET_PASSWORD':
              // Handle reset password flows
              throw new CustomError('RESET_PASSWORD_REQUIRED', 'Password must be reset.');

            default:
              throw new CustomError('Unhanled','You cannot Signin at the moment.');
        }

      }
      catch(error)
      {
        console.log(error)
        this._isLoading.next(false); 
        throw error;
      } 
      finally {
        
        this._isLoading.next(false); 
      }
    }
  

  async checkOnAppLoad()
  {
    try
    {
    this._isLoading.next(true);
    const tokens = await fetchAuthSession();
    if(tokens.tokens?.idToken)
    {
      this.getUserfromDataBase(tokens.tokens.idToken.toString()).subscribe(
        {
          next: (res: User) => {
            this.dbUser = res;
            this.userSubject.next(this.dbUser);
          }
        }
      );
    }
  }
  catch(error){}
  finally
  {
    this._isLoading.next(false);
  }

  }

  saveTokens(tokens: { id_token: string; access_token: string }) {
      var currentUser = new CognitoUser(jwtDecode(tokens.id_token));
        this.userSubject.next(currentUser);
}

getLoadingValue()
{
  return this._isLoading.getValue();
}

setCurrentUser(user: any)
{
  this.userSubject.next(user);
}

getUserfromDataBase(id_token: string): Observable<User> {
  if (!id_token) {
    return throwError(() => new Error('No id_token provided'));
  }
  
  this.cognitoUser = new CognitoUser(jwtDecode(id_token));
  
  return this.as.getUserbyUsername(this.cognitoUser.cognitoUsername).pipe(
    switchMap(res => {
      if (res) {
        this.dbUser = res;
        this.userSubject.next(this.dbUser);
        this.ss.setItem('currentUser', JSON.stringify(this.dbUser));
        return of(res);
      } else {
        // Create user if not found
        const newUser = new User();
        newUser.userName = this.cognitoUser.cognitoUsername;
        newUser.email = this.cognitoUser.email;
        newUser.firstName = this.cognitoUser.given_name;
        newUser.middleName = '';
        newUser.lastName = this.cognitoUser.family_name;
        newUser.createdDate = new Date();
        newUser.modifiedDate = new Date();
        newUser.createdBy = this.cognitoUser.cognitoUsername;
        newUser.modifiedBy = this.cognitoUser.cognitoUsername;
        newUser.active = true;
        return this.as.addUser(newUser).pipe(
          tap((addedUser: any) => {
            if (addedUser) {
              this.dbUser = addedUser;
              this.ss.setItem('currentUser', JSON.stringify(this.dbUser));
              this.userSubject.next(this.dbUser);
            }
          })
        );
      }
    })
  );
}


  getCurrentUser()
  {
     return this.userSubject.getValue() ? this.userSubject.getValue() : this.ss.getCurrentUser();
  }

  async logout() : Promise<void>
  {
    try {
    this._isLoading.next(true); 
    this.userSubject.next(null);
    this.ss.clearAll();
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      this._isLoading.next(false); // Hide the loading state
    }

  }

  async getAccessToken() : Promise<any>
  {
    try
    {
      const session = localStorage.getItem('CognitoIdentityServiceProvider.qqq6spl82al6gincljuevem4p.satyam.accessToken');
      if(session)
      {
        return session.toString();
      }
    }
    catch(error)
    {
      throw Error('Unable to fetch authoration details !');
    }
    return
  }

  async getIdToken() : Promise<any>
  {
    try
    {
      const session = localStorage.getItem('idToken');
      if(session)
      {
        return session.toString();
      }
    }
    catch(error)
    {
      throw Error('Unable to fetch authoration details !');
    }
    return
  }

  async resetPassword(usernames: string) : Promise<any>
  {
    try
    {
      const x =  await resetPassword({username: usernames});
      return x
    }
    catch(error)
    {
      throw error;
    }
    finally
    {
    }
    
  }

  async signup(username: string, first_name: string, last_name: string, email: string, password: string,  middle_name?: string )
  {
    this._isLoading.next(true); 
    try
    {
      await signUp({
        username: username,
        password,
        options: {
          userAttributes: {
            'email': email,
            'given_name': first_name,
            'family_name': last_name,
            'custom:middle_name': middle_name,
          }
        }
      });
    }
    catch(error){
      console.error('Error in while signup - ',error);
      throw error;
    }
    finally{
      this._isLoading.next(false);
    }
  }

  async confirmSignup(username: string, code: string )
  {
    this._isLoading.next(true); 
    try
    {
      await confirmSignUp({
        username: username,
        confirmationCode: code,
      });
    }
    catch(error){
      throw error;
    }
    finally{
      this._isLoading.next(false);
    }
  }
    
}




