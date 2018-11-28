import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DelayResolve } from './transition.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [DelayResolve],
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: [DelayResolve],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    resolve: [DelayResolve],
  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: [DelayResolve],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule],
  providers: [DelayResolve],
})
export class AppRoutingModule { }
