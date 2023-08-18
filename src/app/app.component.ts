import { Component } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockManagement.Client';

  constructor(public signalRService: SignalrService, private http: HttpClient) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferStockDataListener();   
    this.startHttpRequest();
  }
  
  private startHttpRequest = () => {
    this.http.get('https://localhost:7047/api/Stocks/GetStocks')
      .subscribe(res => {
        console.log(res);
      })
  }
}
