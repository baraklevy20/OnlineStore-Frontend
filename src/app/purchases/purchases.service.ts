import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PurchaseDialogComponent } from './purchaseDialog/purchaseDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService, GetUserInfoCaller } from './../users/users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService implements GetUserInfoCaller {
  product;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private http: HttpClient
  ) { }

  buyNow(product) {
    this.product = product;
    // Fill user info before buying
    if (!this.usersService.hasInfo()) {
      this.usersService.showFillInfoDialog(this);
      return;
    }

    this.onUserInfoFilled();
  }

  onUserInfoFilled() {
    // After registering before a purchase, we open the purchase dialog
    this.dialog.open(PurchaseDialogComponent, {
      width: '400px',
      data: this.product
    });
  }

  getPurchases() {
    return this.http.get(`${environment.api_base_url}/purchases`)
  }
}
