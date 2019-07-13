import { PurchasesService } from './../../purchases/purchases.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: [{}];
  numberOfProducts: Number;
  pageNumber: Number;
  pageSize: Number;

  constructor(
    public productsService: ProductsService,
    private purchasesService: PurchasesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.productsService.productsObservable
      .subscribe(products => this.products = products);

    this.productsService.numberOfProductsObservable
      .subscribe(numberOfProducts => this.numberOfProducts = numberOfProducts);

    // Once the page number/size changes, we get new products
    this.route.queryParams.subscribe(params => {
      // If the page number is empty, set it to 0
      if (!params['pageNumber']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { pageNumber: 0 },
          queryParamsHandling: "merge"
        });
        return;
      }

      // If the page size is empty, set it to 10
      if (!params['pageSize']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { pageSize: 10 },
          queryParamsHandling: "merge"
        });
        return;
      }

      this.pageNumber = params['pageNumber'];
      this.pageSize = params['pageSize'];

      // Update the products using the page number and size
      this.productsService.updateProducts(params['pageNumber'], params['pageSize']);
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
    window.scroll(0, 0);
  }

  onBuyNow(product) {
    this.purchasesService.buyNow(product);
  }
}
