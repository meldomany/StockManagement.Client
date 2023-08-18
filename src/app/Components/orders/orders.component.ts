import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  stockID: number = 0;
  stocksAvailable: boolean = false;
  
  displayedColumns: string[] = ['stockID', 'price', 'quantity', 'personName', 'stock', 'controls'];
  dataSource!: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService, private stockService: StockService, private fb: FormBuilder, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.stockService.stockAvailabilty$.subscribe(res => {
      if(res){
        this.stocksAvailable = true;
      }
    })
    this.selectOrders();
  }

  selectOrders(){
    this.stockID = Number(this.route.snapshot.queryParamMap.get('stockID'));
    (this.stockID > 0) ? this.getOrdersByStockID(this.stockID) : this.getOrders();

    this.orderService.currentOrder$.subscribe(response => {
      if(response.stockID == this.stockID || this.stockID == 0){
        this.dataSource.data.push(response);
        this.dataSource._updateChangeSubscription();
      }
    })

  }

  getOrders(){
    this.orderService.getOrders().subscribe(res => {
      if(res.length > 0){
        this.updateTableData(res);
      }
    })
  }

  getOrdersByStockID(stockID: number){
    this.orderService.getOrdersByStockID(stockID).subscribe(res => {
      if(res.length > 0){
        this.updateTableData(res);
      }
    })
  }


  updateTableData(orders: Order[]){
    this.dataSource = new MatTableDataSource(orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
