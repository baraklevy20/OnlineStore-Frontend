import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(pageNumber = 0, pageSize = 10) {
    return this.http.get(`http://192.168.1.12:3000/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
