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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(response => {
      console.log('register');
    }, error => {
      console.log(error);
    });

  }
  cancel() {
    console.log('cancel');
  }


}
