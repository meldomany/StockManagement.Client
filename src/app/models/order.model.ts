import { Stock } from "./stock.model";

export interface Order {
    stockID: number;
    price: number;
    quantity: number;
    personName: string;
    stock: Stock;
}