import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../providers/admin.service';
declare let $:any;
@Component({
  selector: 'new-employee',
  templateUrl: './new.employee.html',
  styleUrls: ['./new.employee.css']
})
export class NewEmployee {
  public newEmployee: FormGroup;
  public departments:any[] = [];
  public roles:any[] = [];
  constructor(public formBuilder: FormBuilder,
              public adminService:AdminService) {
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
              adminService.getRoles().subscribe(response =>{
                if (response.status === 204) {
                  this.roles = [];
                  alert("There is not Roles Entry yet.\nFirst Feed the entries of Roles");
                } else {
                  this.roles = response;
                }
              }, err =>{
                this.roles = [];
                console.log(err);
              });
              this.newEmployee = this.initForm();
  }
  initForm(){    
    return this.formBuilder.group({
      "firstName":['', [Validators.required]],
      "middleName":['', []],
      "lastName":['', [Validators.required]],
      "gender":['', [Validators.required]],
      "email":['', [Validators.required]],
      "password": ['', [Validators.required]],
      "contactNo": ['', [Validators.required]],
      "joiningDate":['', [Validators.required]],
      "employeeRoles": this.formBuilder.array([this.initRoleDepartment()])
    });
  }
  initRoleDepartment(){
    return this.formBuilder.group({
        "roleId": ['', [Validators.required]],
        "departmentId":['', [Validators.required]],
      });
  }
  onSubmit() {
    console.log(this.newEmployee.value);
    this.adminService.addEmployee(this.newEmployee.value).subscribe(response =>{
      console.log(response);
      $('#empModal').modal('show');
      this.newEmployee.reset();
    }, error =>{
      console.log("Somthing went wrong", error);
    });
  }
}