import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { TransitionDelayResolve } from './transition-delay.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [TransitionDelayResolve],
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: [TransitionDelayResolve],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    resolve: [TransitionDelayResolve],
  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: [TransitionDelayResolve],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
  })],
  exports: [RouterModule],
  providers: [TransitionDelayResolve],
})
export class AppRoutingModule { }
