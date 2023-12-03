import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavListService {


  private items: { listName: string, selectedOption: string }[] = [];


  addItem(item: { listName: string, selectedOption: string }) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  constructor() { }
}
