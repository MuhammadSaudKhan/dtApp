import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerMode: any = false;
  constructor() { }

  ngOnInit() {
  }
  register() {
    console.log('register');
  }
  cancel() {
    console.log('cancel');
  }


}
