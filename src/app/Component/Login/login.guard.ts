import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate() {
    if (localStorage.getItem('user_roleInfo')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
  }

}