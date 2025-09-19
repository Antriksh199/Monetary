import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../models/Admin/user.js';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  getItem(key: string): string | null {
      return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
      localStorage.setItem(key, value);
    }
  

  removeItem(key: string): void {
      localStorage.removeItem(key);
  }

  clearAll()
  {
    localStorage.clear();
  }

getCurrentUser() : User{

      const rawUser = this.getItem("currentUser");
      if(rawUser)
      {
        let obj =  Object.assign(new User(), JSON.parse(rawUser));
        return obj;
      }
      return new User();
    }

    deleteAll()
    {
      localStorage.clear();
    }

  getIdToken() : string|null
  {
    const key = Object.keys(localStorage).filter(key => key.endsWith('.idToken')).toString();
    const idToken = localStorage.getItem(key);
    if(idToken)
    {
      return idToken.toString();
    }
    return null;
  }

  }

