import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public productsObservable: Subject<any> = new Subject<any>();
  public numberOfProductsObservable: Subject<any> = new Subject<any>();

  private products;
  private numberOfProducts;

  constructor(
    private http: HttpClient
  ) { }

  updateProducts(pageNumber = 0, pageSize = 10) {
    this.http.get(`${environment.api_base_url}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`).subscribe(data => {
      this.products = data["products"].map((p, i) => ({...p, index: i}));
      this.numberOfProducts = data["numberOfProducts"];

      // Notify everyone who's subscribed
      this.productsObservable.next(this.products);
      this.numberOfProductsObservable.next(this.numberOfProducts);
    });
  }

  updateProduct(productIndex, product) {
    this.products[productIndex] = product;

    // Notify everyone who's subscribed
    this.productsObservable.next(this.products);
  }
}
