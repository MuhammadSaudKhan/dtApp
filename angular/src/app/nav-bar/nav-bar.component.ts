import { AuthService } from './../../service/Auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/service/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  model: any = {};
  i: any;
  username: any;
  constructor(private authService: AuthService, private alertifyService: AlertifyService, private route: Router ) { }
  helper = new JwtHelperService();
  ngOnInit() {
       const token = localStorage.getItem('token');
       this.username = this.decodedToken(token);
       console.log(this.decodedToken(token));
  }

  login() {
     this.authService.login(this.model).subscribe(next => {
       this.alertifyService.success('successful');
       const token = localStorage.getItem('token');
       this.username = this.decodedToken(token);
       console.log(this.decodedToken(token));
     }, error => {
      this.alertifyService.error(error);
     }, () => {
        this.route.navigate(['/members']);
     });
  }
  loggedIn() {
     const token = localStorage.getItem('token');
     return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
  decodedToken(token: any) {
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken;
  }
}
