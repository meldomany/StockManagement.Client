import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  stockBaseUrl = environment.apiUrl + 'Orders/';

  private orderAdded = new ReplaySubject<Order>(1);
  currentOrder$ = this.orderAdded.asObservable();

  constructor(private http: HttpClient) { }

  getOrders() {
     return this.http.get<Order[]>(this.stockBaseUrl + "GetOrders");
  }

  getOrdersByStockID(stockID: number) {
    return this.http.get<Order[]>(this.stockBaseUrl + "GetOrdersByStockID/" + stockID);
 }

  createOrder(orderForm: FormData) {
    return this.http.post<Order>(this.stockBaseUrl + "CreateOrder", orderForm).pipe(
       map((response) => {
        this.orderAdded.next(response);
        return response;
      })
    );
 }
}
