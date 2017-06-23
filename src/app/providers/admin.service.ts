import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { CommonService } from './common.service';
import { CustomHttpService } from './default.header.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminService {

  private baseUrl: string = "";

  constructor(public http: CustomHttpService,
    public htttp: Http,
    public con: CommonService) {
    this.baseUrl = con.baseUrl;
  }

  getDepartments() {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/department")
            .map(this.extractData)
            .catch(this.handleError);
  }

  getRoles() {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/role")
            .map(this.extractData)
            .catch(this.handleError);
  }

  getUniversity(){
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/university")
            .map(this.extractData)
            .catch(this.handleError);
  }

  public addUniversity(data:any){
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/university",data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addDepartment(department:any){
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/department",department)
      .map(this.extractData)
      .catch(this.handleError);
  }  

  public addEmployee(employee:any){
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/employee",employee)
            .map(this.extractData)
            .catch(this.handleError);
  }

  public addRole(role:any){
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/role",role)
            .map(this.extractData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "Something is wrong.."`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}