import { AuthService } from './../../service/Auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
        console.log('login successful');
    }, error => {
        console.log(error);
    });
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout() {
    localStorage.removeItem('token');
  }
}
