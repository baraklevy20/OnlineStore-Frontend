import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products;
  numberOfProducts = 100;
  pageNumber;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Once the page changes, we get new products
    this.route.queryParams.subscribe(params => {
      this.pageNumber = params['pageNumber'];

      if (!this.pageNumber) {
        this.pageNumber = 0;
      }

      this.productsService.getProducts(params['pageNumber'], params['pageSize']).subscribe(result => {
        this.products = result["products"];
        this.numberOfProducts = result["numberOfProducts"];
      })
    });
  }

  onPageChanged(event) {
    // Move on to another page
    this.router.navigate(['products'], {
      queryParams: {
        pageNumber: event.pageIndex,
        pageSize: event.pageSize
      }
    });

    // And scroll to top
    window.scroll(0,0);
  }
}
