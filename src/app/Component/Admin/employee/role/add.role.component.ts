import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../../providers/admin.service';
declare let $:any;
@Component({
  selector:'add-role',
  templateUrl:'./add.role.component.html',
  styleUrls:['./add.role.component.css']
})
export class AddRole{
  public addRole: FormGroup;
  constructor(public formBuilder: FormBuilder,
              public adminService:AdminService){

              this.addRole = this.formBuilder.group({
                "role": ['', [Validators.required]]
              });
  }
  onSubmit(){
    this.adminService.addRole(this.addRole.value).subscribe(res =>{
      console.log(res);
      $('#roleModal').modal('show');
      this.addRole.reset();
    }, err =>{
      console.log(err);
    })
  }
}