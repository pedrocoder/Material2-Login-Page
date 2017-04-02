import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {SignupRequest} from './signup-request.interface';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignupService {
  private readonly headers = new Headers({ 'Content-Type': 'application/json' });
  private readonly options = new RequestOptions({ headers: this.headers });
  private readonly signupApi = '/v1/signup';
  constructor(private http: Http) { }

  public signup(request: SignupRequest): Observable<any> {
    return this.http.post(this.signupApi, request, this.options)
      .map(response => response.json());
  }
}
