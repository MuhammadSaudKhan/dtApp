import { AlertifyService } from './../service/alertify.service';
import { ErrorIntercepterProvide } from './../service/error.interceptor';
import { AuthService } from './../service/Auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { from } from 'rxjs';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavBarComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      NgbModule
   ],
   providers: [
      AuthService,
      ErrorIntercepterProvide,
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
