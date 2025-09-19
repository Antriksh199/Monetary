import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader/loader-service.js';
import { AuthService } from '../services/auth/auth-service.js';
import { from } from 'rxjs';
import { User } from '../models/Admin/user.js';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const authService = inject(AuthService);
  const user: User = authService.getCurrentUser();
  loader.show();

  return from(authService.getIdToken()).pipe(
    switchMap(idToken => {
      const clonedReq = idToken && idToken !== ''
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`
            }
          })
        : req;

      return next(clonedReq);
    }),
    finalize(() => loader.hide())
  );
};
