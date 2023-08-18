import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './Components/stocks/stocks.component';
import { OrdersComponent } from './Components/orders/orders.component';

const routes: Routes = [
  { path: 'stocks', component: StocksComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
