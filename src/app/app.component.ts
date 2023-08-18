import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockManagement.Client';

  constructor(private stockService: StockService, private http: HttpClient) { }

  ngOnInit() {
    this.stockService.startConnection();
  }
}
