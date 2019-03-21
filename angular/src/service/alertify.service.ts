import { Injectable } from '@angular/core';

declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
constructor() { }


message(msg: string) {
  alertify.message(msg);
}

error(msg: string) {
  alertify.error(msg);
}
success(msg: string) {
  alertify.success(msg);
}
warning(msg: string) {
  alertify.warning(msg);
}
}
