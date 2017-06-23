import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { CommonService } from '../providers/common.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class CredentialService {
  public baseUrl: string = "";
  login: any = false;
  headers: any;
  access_token: string;
  private loggedIn = false;
  constructor(private http: Http, private conf: CommonService) {
    
    this.loggedIn = !!localStorage.getItem('access_token');
    if(this.loggedIn){
      this.conf.updateBaseUrl();
    } 
    this.baseUrl = this.conf.baseUrl;
  }

  resetLoginStatus() {
    this.login = false;
  }

  isLoggedIn() {
    let access_token:any = localStorage.getItem("access_token");
    if (access_token) {
      return !this.login;
    } else {
      return this.login;
    }
  }

  verifyUser(data: Object) {
    this.baseUrl = this.conf.baseUrl;
    return this.http.post(this.baseUrl + "/login", data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  logOut(){
    this.conf.resetBaseUrl();
    localStorage.clear();    
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }
}