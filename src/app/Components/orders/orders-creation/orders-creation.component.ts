import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { OrderService } from 'src/app/services/order.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-orders-creation',
  templateUrl: './orders-creation.component.html',
  styleUrls: ['./orders-creation.component.css']
})
export class OrdersCreationComponent implements OnInit {

  stocks: Stock[] = [];

  orderForm = this.fb.group({
    stockID: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(5), Validators.max(1000)]],
    quantity: [0, [Validators.required, Validators.min(1), Validators.max(20)]],
    personName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
}) as FormGroup;


  constructor(private orderService: OrderService, private stockService: StockService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(){
    this.stockService.getStocks().subscribe(res => {
      if(res.length > 0){
        this.stocks = res;
      }
    })
  }

  addNewOrder(){
    let orderFormData = new FormData();
    Object.keys(this.orderForm.controls).forEach(formControlName => {
      orderFormData.append(formControlName,  this.orderForm.get(formControlName)?.value);    
    });

    this.orderService.createOrder(orderFormData).subscribe((res) => {
      if(res){
        console.log("created");
      }
    })
  }
}
