import { AuthService } from './../../service/Auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/service/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  model: any = {};
  i: any;
username: any;
  constructor(private authService: AuthService, private alertifyService: AlertifyService ) { }
  helper = new JwtHelperService();
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.username = this.decodedToken(token);
  }

  login() {
     this.authService.login(this.model).subscribe(next => {
       this.alertifyService.success('successful');
     }, error => {
      this.alertifyService.error(error);
     });
  }
  loggedIn() {
     const token = localStorage.getItem('token');
     return !!token;
  }
  logout() {
    localStorage.removeItem('token');
  }
  decodedToken(token: any) {
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken;
  }
}
