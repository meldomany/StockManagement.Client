import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksComponent } from './Components/stocks/stocks.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { OrdersCreationComponent } from './Components/orders/orders-creation/orders-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerLoader } from './interceptors/spinner-loader';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NavbarComponent} from './Components/Shared/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { OrderStockDetailsComponent } from './Components/orders/order-stock-details/order-stock-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    OrdersComponent,
    OrdersCreationComponent,
    NavbarComponent,
    OrderStockDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatOptionModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: SpinnerLoader, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
