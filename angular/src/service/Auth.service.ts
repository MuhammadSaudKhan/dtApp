import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/Operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private httClient: HttpClient) { }
helper = new JwtHelperService();
decoded: any;
login(model: any) {
  return this.httClient.post('http://localhost:5000/api/Auth/login', model).pipe(map( (response: any ) => {
    const token = response;
    if (token) {
      localStorage.setItem('token', token.token);
    }
  }));
}

register(model: any) {
  return this.httClient.post('http://localhost:5000/api/Auth/register', model);
}

}
