import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { CommonService } from './common.service';
import { CustomHttpService } from './default.header.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrganizationService2 {

  private baseUrl: string = "";

  constructor(public http: CustomHttpService,
    public htttp: Http,
    public con: CommonService) {
    this.baseUrl = con.baseUrl;
  }

  public orgInitialSetup(data: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/initialSetup", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addValue(val: any[]) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/values", val)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateValue(val: any, id: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.put(this.baseUrl + "/values/" + id, val)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteValue(id: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.delete(this.baseUrl + "/values/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUniversities() {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/university")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchOrganizationInfo() {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/university")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchObjectives(cycleId: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/cycle/" + cycleId + "/objective")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addObjective(objective: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/objective", objective)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addInitiative(initiative: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/initiative", initiative)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchInitiative(goalId: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/objective/" + goalId + "/initiative")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchAssignedActivity(departmentIds: any[]) {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/department/" + departmentIds + "/result")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveQuarteResult(data: any, quarterId: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/result", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateQuarteResult(data: any, resultId: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.put(this.baseUrl + "/result/" + resultId, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public lockResult(resultId: any){
    this.baseUrl = this.con.baseUrl;
    return this.http.put(this.baseUrl + "/result/" + resultId,{status:"locked"})
    .map(this.extractData)
    .catch(this.handleError);
  }

  public saveEvidence(data: any, resultId: any) {
    this.baseUrl = this.con.baseUrl;
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.htttp.post(this.baseUrl + "/result/" + resultId + "/evidance", data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveComment(resultId: any, comment: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/result/" + resultId + "/discussion", comment)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public fetchDepartments() {
    this.baseUrl = this.con.baseUrl;
    return this.http.get(this.baseUrl + "/university/1/department")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public assignActivity(actId: any, departments: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/assign/activity/" + actId + "/departments", { 'departments': departments })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveActivity(activity: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/activity", activity)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveSpi(spi: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/spi", spi)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveMeasure(measure: any) {
    this.baseUrl = this.con.baseUrl;
    return this.http.post(this.baseUrl + "/measures", measure)
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