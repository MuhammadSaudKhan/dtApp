import { AlertifyService } from './../../service/alertify.service';
import { AuthService } from './../../service/Auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertifyService.warning('you need to login first');
    this.router.navigate(['/']);
    return false;
  }
}
