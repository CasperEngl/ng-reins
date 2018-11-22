import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import createHmac from 'create-hmac';
import * as OAuth from 'oauth-1.0a';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>('http://minimal.test/wp-json/wp/v2/posts?_embed', {
      params: {
        per_page: '6'
      }
    });
  }

  getProducts(): Observable<any[]> {
    const oauth = new OAuth({
      consumer: {
        key: environment.consumer_key,
        secret: environment.consumer_secret,
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return createHmac('sha1', key).update(base_string).digest('base64');
      },
    });

    const request_data = {
      url: 'http://minimal.test/wp-json/wc/v3/products/',
      method: 'GET',
    };

    const auth = oauth.authorize(request_data);

    return this.http.get<any[]>(request_data.url, {
      headers: new HttpHeaders({
        Authorization: `OAuth oauth_consumer_key="${auth.oauth_consumer_key}" oauth_nonce="${auth.oauth_nonce}" oauth_signature="${auth.oauth_signature}" oauth_signature_method="${auth.oauth_signature_method}" oauth_timestamp="${auth.oauth_timestamp}" oauth_version="${auth.oauth_version}"`, // tslint-disable-line
      })
    });

    /*
    const json = await axios({
      url: request_data.url,
      method: request_data.method,
      headers: {
        Authorization: `OAuth oauth_consumer_key="${auth.oauth_consumer_key}" oauth_nonce="${auth.oauth_nonce}" oauth_signature="${auth.oauth_signature}" oauth_signature_method="${auth.oauth_signature_method}" oauth_timestamp="${auth.oauth_timestamp}" oauth_version="${auth.oauth_version}"`, // tslint-disable-line
      }
    });

    return json;
    */
  }
}
