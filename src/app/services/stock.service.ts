import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/stock.model';
import { environment } from 'src/environments/environment';
import { ReplaySubject, map } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stockBaseUrl = environment.apiUrl + 'Stocks/';

  private stocksAvailable = new ReplaySubject<boolean>(1);
  stockAvailabilty$ = this.stocksAvailable.asObservable();

  private stocks = new ReplaySubject<Stock[]>();
  stocks$ = this.stocks.asObservable();

  constructor(private http: HttpClient) { }


  startConnection(){
    this.getStocks().subscribe();
    const connection = new signalR.HubConnectionBuilder()  
    .configureLogging(signalR.LogLevel.Information)  
    .withUrl(environment.baseUrl + 'stock')  
    .build();
    
    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });
    
    connection.on("BroadcastMessage", () => {  
      this.getStocks().subscribe();  
    });

    setInterval(() => {
      this.updateStocks().subscribe();
    }, 10000);
  }

  getStocks() {
     return this.http.get<Stock[]>(this.stockBaseUrl + "GetStocks").pipe(map((res) => {
      if(res.length > 0){
        this.stocksAvailable.next(true);
      }
      this.stocks.next(res);
     }));
  }

  updateStocks() {
    return this.http.get(this.stockBaseUrl + "UpdateStocks");
  }
}
