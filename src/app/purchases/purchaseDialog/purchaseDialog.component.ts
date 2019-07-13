import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../environments/environment';
import { Component, OnInit, AfterViewChecked, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/products/products.service';

declare let paypal: any;

@Component({
  selector: 'app-purchaseDialog',
  templateUrl: './purchaseDialog.component.html',
  styleUrls: ['./purchaseDialog.component.css']
})
export class PurchaseDialogComponent implements OnInit, AfterViewChecked {
  addScript: boolean = false;
  paypalLoad: boolean = true;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private productsService: ProductsService, 
    @Inject(MAT_DIALOG_DATA) private product,
    public dialogRef: MatDialogRef<PurchaseDialogComponent>
  ) { }

  ngOnInit() {
  }

  paypalConfig = {
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: this.product.price
          }
        }]
      });
    },
    onApprove: (data, actions) => {
      // Capture the funds from the transaction
      return actions.order.capture().then((details) => {
        this.http.post(`${environment.api_base_url}/purchases`, {
          orderId: data.orderID,
          productId: this.product.id
        }).subscribe(next => {
          this.snackBar.open("Product purchased successfully!", null, {
            duration: 3000
          });
          this.product.sold++;
          this.productsService.updateProduct(this.product.index, this.product);
        }, error => {
          this.snackBar.open(error.message, "X");
        }, () => {
          // Finally, close the dialog
          this.dialogRef.close();
        });
      });
    }
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Buttons(this.paypalConfig).render('#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.id = 'paypal_script';
      scripttagElement.src = `https://www.paypal.com/sdk/js?client-id=${environment.paypal_clientid}`;
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}

@Component({
  selector: 'snack-bar-component-good-message',
  template: "<span style='background:green'>Item purchased successfully!</span>",
  styles: [],
})
export class PizzaPartyComponent { }
