import { PurchasesListComponent } from './purchases/purchases-list/purchases-list.component';
import { PurchaseDialogComponent } from './purchases/purchaseDialog/purchaseDialog.component';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { AppComponent } from './app.component';
import { CustomHttpInterceptor } from './CustomHttpInterceptor';
import { FillInfoDialogComponent } from './users/fillInfoDialog/fillInfoDialog.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { MatButtonModule, MatCardModule, MatListModule, MatGridListModule, MatDividerModule, MatLineModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    FillInfoDialogComponent,
    PurchaseDialogComponent,
    PurchasesListComponent,
    TopBarComponent
  ],
  entryComponents: [
    FillInfoDialogComponent,
    PurchaseDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatLineModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }