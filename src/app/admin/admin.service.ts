import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../shared/models/login.modal';
import { Order } from '../shared/models/order.modal';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  checkUserAvailability(username: string) {
    console.log(username, 'userame');
    const users = this.http.get<Login[]>('http://localhost:3000/users/' + username, {
      observe: 'body', responseType: 'json'
    });
    return users;
  }
  generateReport(sDate:  string , eDate: string) {
    console.log(sDate, eDate);
    const orderData = this.http.get<Order[]>('http://localhost:3000/getOrdersByDate/' + sDate +
      '/' + eDate, { observe: 'body', responseType: 'json' });
    return orderData;
  }
}
