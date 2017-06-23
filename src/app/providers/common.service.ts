import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CommonService {
  private url:string = "http://planning.ind-cloud.everdata.com/api";
  // private url:string = "http://localhost:8080/strategyPlanningV3";
  public baseUrl: string ;
  
  constructor() { 
    this.baseUrl = this.url;
  }

  updateBaseUrl() {
    this.baseUrl = this.baseUrl + "/" + this.getData('user_roleInfo')[0].role;
  }

  resetBaseUrl(){
    this.baseUrl = this.url;
  }

  public storeData(field_name:any, data:any) {
    if(field_name==="access_token")
      localStorage.setItem(field_name,data);
    else{
      localStorage.setItem(field_name,JSON.stringify(data));
    }
  }

  public getData(field_name:any) {
    let data = JSON.parse(localStorage.getItem(field_name));
    if (data) {
      return data;
    }
  }

}