import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    // return this.credentialService.isLoggedIn();
    if (localStorage.getItem('user_roleInfo')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url and return false
        this.router.navigate(['/login']);
        return false;
  }

}