import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../providers/admin.service';
declare let $:any;
@Component({
  selector:'existing-department',
  templateUrl:'./existing.department.component.html',
  styleUrls:['./existing.department.component.css']
})
export class ExistingDepartment{
  public departments:any[] = [];
  constructor(public adminService:AdminService){
    adminService.getDepartments().subscribe(response =>{
                if (response.status === 204) {
                  this.departments = [];
                  alert("There is not Department Entry yet.\nFirst Feed the entries of Department");
                } else {
                  this.departments = response;
                }
              }, err =>{
                this.departments = [];
                console.log(err);
              });
  }
}