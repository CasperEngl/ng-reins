import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';

export interface ProductData {
  product_id: number;
  quantity: number;
  variation_id?: number;
  variation?: any[];
}

export interface CartItem {
  cart_item_key: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  private productsSource = new BehaviorSubject<any[]>([]);
  products = this.productsSource.asObservable();

  private cartSource = new BehaviorSubject<any[]>([]);
  cart = this.cartSource.asObservable();

  private cartTotalsSource = new BehaviorSubject<any[]>([]);
  cartTotals = this.cartTotalsSource.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v3/products/`,
      method: 'GET',
    };

    const auth = environment.oauth.authorize(request);

    this.http.get<any[]>(request.url, {
      headers: new HttpHeaders({
        Authorization: `OAuth oauth_consumer_key="${auth.oauth_consumer_key}" oauth_nonce="${auth.oauth_nonce}" oauth_signature="${auth.oauth_signature}" oauth_signature_method="${auth.oauth_signature_method}" oauth_timestamp="${auth.oauth_timestamp}" oauth_version="${auth.oauth_version}"`, // tslint-disable-line
      })
    }).subscribe(response => this.productsSource.next(response));

    return this.products;
  }

  getProduct(id: number): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v3/products/${id}`,
      method: 'GET',
    };

    const auth = environment.oauth.authorize(request);

    return this.http.get<any>(request.url, {
      headers: new HttpHeaders({
        Authorization: `OAuth oauth_consumer_key="${auth.oauth_consumer_key}" oauth_nonce="${auth.oauth_nonce}" oauth_signature="${auth.oauth_signature}" oauth_signature_method="${auth.oauth_signature_method}" oauth_timestamp="${auth.oauth_timestamp}" oauth_version="${auth.oauth_version}"`, // tslint-disable-line
      })
    });
  }

  getPages(): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wp/v2/pages`,
    }

    return this.http.get<any[]>(request.url);
  }

  addToCart(product_data: ProductData): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/add`,
    }

    const addedProduct = this.http.post<ProductData>(request.url, product_data);

    addedProduct.toPromise().then(() => this.getCart());

    return addedProduct;
  }

  getCart(): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart`,
    }
    
    this.http.get<any>(request.url).subscribe(response => {
      this.cartSource.next(response);
      this.getCartTotals();
    });
    
    return this.cart;
  }

  clearCart(): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/clear`,
    }

    return this.http.post<any>(request.url, null, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    });
  }

  countCart(): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/count-items`,
    }

    return this.http.get<any>(request.url);
  }
  
  calculateCart(): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/calculate`,
    }

    return this.http.post<any>(request.url, {});
  }

  getCartTotals(): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/totals`,
    }

    this.http.get<any>(request.url).subscribe(response => this.cartTotalsSource.next(response));

    return this.cartTotals;
  }

  deleteFromCart(cart_item_key: string): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/cart-item`,
      data: {
        cart_item_key,
      }
    }

    const deletedProduct = this.http.request<any>('delete', request.url, {
      body: request.data,
    });

    deletedProduct.toPromise().then(() => this.getCart());

    return deletedProduct;
  }

  restoreToCart(cart_item_key: string): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/cart-item`,
      data: {
        cart_item_key,
      }
    }

    return this.http.get<any>(request.url, {
      params: request.data,
    });
  }

  updateInCart(product_data: CartItem): Observable<any> {
    const request = {
      url: `${window.location.origin}/wp-json/wc/v2/cart/cart-item`,
    }

    const updatedCart = this.http.post<CartItem>(request.url, product_data);

    updatedCart.toPromise().then(() => this.getCart());

    return updatedCart;
  }
}
