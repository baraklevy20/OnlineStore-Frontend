import { PurchasesService } from './../purchases.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent implements OnInit {
  purchases;

  constructor(
    purchasesService: PurchasesService
  ) { 
    this.purchases = purchasesService.getPurchases();
  }

  ngOnInit() {
  }
}
