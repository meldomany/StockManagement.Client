import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  data!: Stock[];

  private hubConnection!: signalR.HubConnection;
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7047/stock')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addTransferStockDataListener = () => {
      this.hubConnection.on('TransferStockData', (data) => {
        this.data = data;
        console.log(data);
      });
    }
}
