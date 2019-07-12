import { UsersService } from './../users/users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(
    private usersService: UsersService
  ) { }

  buyNow(product) {
    if (!this.usersService.hasInfo()) {
      this.usersService.fillInfo();
    }

    // buy now
  }

  addToCart(product) {
    if (!this.usersService.hasInfo()) {
      this.usersService.fillInfo();
    }
  }
}
