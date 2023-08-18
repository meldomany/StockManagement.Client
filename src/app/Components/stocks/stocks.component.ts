import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: Stock[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'controls'];
  
  constructor(private stockService: StockService) {}
  
  ngOnInit(): void {
    this.stockService.stocks$.subscribe(res => {
      this.stocks = res;
    });
  }
}
