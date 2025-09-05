import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuardGuard: CanMatchFn = (route, segments) => {
    const _authS = inject(Auth);
  const _router = inject(Router);

 if (_authS.isUserLoggedIn() && _authS.islogedin()?.role === 'admin'){
    return true; 
  }

  // _router.navigate(['/login']);
  _router.createUrlTree(['/login', {queryParams: {returnUrl: segments.join('/')}}]);
  return false;
};
