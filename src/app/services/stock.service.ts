import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/stock.model';
import { environment } from 'src/environments/environment';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stockBaseUrl = environment.apiUrl + 'Stocks/';

  private stocksAvailable = new ReplaySubject<boolean>(1);
  stockAvailabilty$ = this.stocksAvailable.asObservable();

  constructor(private http: HttpClient) { }

  getStocks() {
     return this.http.get<Stock[]>(this.stockBaseUrl + "GetStocks").pipe(map((res) => {
      if(res.length > 0){
        this.stocksAvailable.next(true);
      }
      return res;
     }));
  }
}
