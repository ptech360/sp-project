import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../../providers/admin.service';
declare let $:any;
@Component({
  selector:'new-university',
  templateUrl:'./new.university.component.html',
  styleUrls:['./new.university.component.css']
})
export class NewUniversity{
  public newUniversity: FormGroup;
  constructor(public formBuilder: FormBuilder,
              public adminService:AdminService){

              this.newUniversity = this.formBuilder.group({
                "university": ['', [Validators.required]]
              });
  }
  onSubmit(){
    this.adminService.addUniversity(this.newUniversity.value).subscribe(res =>{
      console.log(res);
      $('#utModal').modal('show');
      this.newUniversity.reset();
    }, err =>{
      console.log(err);
    })
  }
}