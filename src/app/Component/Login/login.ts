import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService } from '../../providers/credential.service';
import { CommonService } from '../../providers/common.service';
import { OrganizationService2 } from '../../providers/organization.service2';
declare let $:any;

@Component({
  selector:'login',
  templateUrl:'./login.html',
  styleUrls:['./login.css']
})
export class Login{
  public loginForm: FormGroup;
  public role:string;
  public loginStart: boolean = false;
  public error:boolean = false;
  constructor(public formBuilder: FormBuilder,
              public router:Router,
              private commonService: CommonService,
              public credentialService: CredentialService,
              public org_ser: OrganizationService2,
              ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    if (localStorage.getItem('user_roleInfo')) {
      this.router.navigateByUrl("/"+this.commonService.getData('user_roleInfo')[0].role);
    }
  }
  ngAfterViewChecked() {
    $("#login-button").click(function(event:any) {
      event.preventDefault();
      $('form').fadeOut(500);
      $('.wrapper').addClass('form-success');
    });
  }
  private onSubmit() {
    this.loginStart = true;
    this.credentialService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.commonService.storeData("access_token", res.access_token);
      this.commonService.storeData("userDetails",res.userDetails)
      this.commonService.storeData("user_roleInfo", res.userDetails.roleInfo);  
      this.commonService.updateBaseUrl(); 
      this.role = res.userDetails.roleInfo[0].role;
      if(this.role == "planner"){
        this.fetchOrganizationInfo(res);
      } else {
        this.onSuccess();
      }
      this.onSuccess();  
        
    }, (err) => {
      this.onError();
    });
  }
  
  public fetchOrganizationInfo(user_info:any) {
    this.org_ser.fetchOrganizationInfo().subscribe((res:any) => {
      if(res.cycles) {
        this.buildData(res);
      } else {
         this.commonService.storeData("org_info", res);        
      }
      this.onSuccess();    
    }, (err:any) => {
      this.onError();
    });
  }

  public buildData(info:any) {
      // let cycle:any[] = [];
      // let org_info = info;
      // var startYear = new Date(org_info[0].cycles.startCycle).getFullYear();
      // var endYear = new Date(org_info[0].cycles.endCycle).getFullYear();
      // for (var y = startYear; y <= endYear; y++) {
      //   cycle.push(y);
      // }
      // org_info[0]['cycle'] = cycle;
      this.commonService.storeData("org_info", info);
  }  

  public onSuccess() {
    this.loginStart = false;
    this.router.navigateByUrl("/"+this.role);
  }  

  public onError() {
    this.loginStart = false;
    this.error = true;
  }
}