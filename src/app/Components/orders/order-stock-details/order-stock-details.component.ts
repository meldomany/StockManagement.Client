import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { OrderService } from 'src/app/services/order.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-order-stock-details',
  templateUrl: './order-stock-details.component.html',
  styleUrls: ['./order-stock-details.component.css']
})
export class OrderStockDetailsComponent implements OnInit {

  stockID: number = 0;
  stockDetails!: Stock;

  constructor(private orderService: OrderService, private stockService: StockService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stockID = Number(this.route.snapshot.queryParamMap.get('stockID'));
    this.getStockDetails();
  }

  getStockDetails(){
    this.stockService.stocks$.subscribe(res => {
      if(res.length > 0){
        console.log(res);
        this.stockDetails = res.find(r => r.id == this.stockID) as Stock;
      }
    });
}

}
