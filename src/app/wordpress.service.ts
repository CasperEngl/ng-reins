import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    const request_data = {
      url: `${window.location.origin}/wp-json/wc/v3/products/`,
      method: 'GET',
    };

    const auth = environment.oauth.authorize(request_data);

    return this.http.get<any[]>(request_data.url, {
      headers: new HttpHeaders({
        Authorization: `OAuth oauth_consumer_key="${auth.oauth_consumer_key}" oauth_nonce="${auth.oauth_nonce}" oauth_signature="${auth.oauth_signature}" oauth_signature_method="${auth.oauth_signature_method}" oauth_timestamp="${auth.oauth_timestamp}" oauth_version="${auth.oauth_version}"`, // tslint-disable-line
      })
    });
  }

  getProduct(id: number): Observable<any> {
    const request_data = {
      url: `${window.location.origin}/wp-json/wc/v3/products/${id}`,
      method: 'GET',
    };

    const auth = environment.oauth.authorize(request_data);

    return this.http.get<any>(request_data.url, {
      headers: new HttpHeaders({
        Authorization: `OAuth oauth_consumer_key="${auth.oauth_consumer_key}" oauth_nonce="${auth.oauth_nonce}" oauth_signature="${auth.oauth_signature}" oauth_signature_method="${auth.oauth_signature_method}" oauth_timestamp="${auth.oauth_timestamp}" oauth_version="${auth.oauth_version}"`, // tslint-disable-line
      })
    });
  }

  getPages(): Observable<any> {
    const request_data = {
      url: `${window.location.origin}/wp-json/wp/v2/pages`,
    }

    return this.http.get<any[]>(request_data.url);
  }
}
