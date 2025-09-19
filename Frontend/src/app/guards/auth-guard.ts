import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.js';
//import { configuration } from '../environment';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();
    if(user.id)
    {
      return true;
    }
    router.navigate(['login']);
  return false;
};
