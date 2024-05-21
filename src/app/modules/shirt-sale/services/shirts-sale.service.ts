import { Injectable, signal } from "@angular/core";
import { Item } from "../interfaces/items.interface";

@Injectable({
  providedIn: 'root'
})
export class ShirtsSaleService {
  key = signal('109128091');
  readonly cart:any = {
    items: [
    ]
  }

  constructor() { }


  addToCart(item: Item & {cantidad?:number}, cantidad?: number): void {
    item = {
      ...item,
      cantidad: cantidad || 0
    }
    this.cart.items.push(item);
    localStorage.setItem(this.key(), JSON.stringify(this.cart));
    console.log(localStorage.getItem(this.key()), this.key());


  }


}
