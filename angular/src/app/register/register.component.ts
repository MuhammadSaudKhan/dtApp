import { AlertifyService } from 'src/service/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerMode: any = false;
  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(response => {
      this.alertifyService.success('register');
    }, error => {
      this.alertifyService.error(error);
    });

  }
  cancel() {
    console.log('cancel');
  }


}
