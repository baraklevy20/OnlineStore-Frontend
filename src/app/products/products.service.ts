import { environment } from './../../environments/environment';
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
    return this.http.get(`${environment.api_base_url}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
