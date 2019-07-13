import { ProductsListComponent } from './products/products-list/products-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchasesListComponent } from './purchases/purchases-list/purchases-list.component';

const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'purchases', component: PurchasesListComponent },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
