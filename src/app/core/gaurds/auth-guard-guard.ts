import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
   const authS = inject(Auth);
  const router= inject(Router);
  if(authS.isUserLoggedIn()===true){
    return true;
  }

 return router.navigate(['/login']);
//  return router.createUrlTree(['/login', {queryParams: {returnUrl: state.url}}]);
};

