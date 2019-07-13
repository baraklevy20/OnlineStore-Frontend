import { PurchasesService } from './../purchases.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent implements OnInit {
  purchases: Observable<any>;

  constructor(
    purchasesService: PurchasesService
  ) { 
    this.purchases = purchasesService.getPurchases();
  }

  ngOnInit() {
  }
}
