import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import {OrganizationService2} from '../../../providers/organization.service2';

declare let $:any;

@Component({
  selector:'cycle',
  templateUrl:'./cycle.html',
  styleUrls:['./../planner.home.css']
})
export class CycleComponent implements OnInit {
  public valueForm:FormGroup;
  public organizationInfo:any;
  public selectedValue:any;

  constructor(public commonService: CommonService,public orgSer:OrganizationService2) {
    this.valueForm = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',Validators.required),
    });
   }

  ngOnInit() {
    this.organizationInfo = this.commonService.getData('org_info');    
  }

  onValueSubmit(){
    if(this.selectedValue){
      this.orgSer.updateValue(this.valueForm.value,this.selectedValue.id)
      .subscribe((res:any)=>{
        this.valueForm.value["id"] = this.selectedValue.id;
        this.organizationInfo.values[this.selectedValueIndex] = this.valueForm.value;
        this.commonService.storeData('org_info',this.organizationInfo);
        $('#valueForm').modal('hide');
        this.valueForm.reset();
      })
    }else{
      this.valueForm.value["setupId"] = this.organizationInfo[0].setupId;
      this.orgSer.addValue([this.valueForm.value]).subscribe((res:any)=>{
        this.organizationInfo.values.push(this.valueForm.value);
        $('#valueForm').modal('hide');
        this.valueForm.reset();
      })
    }    
  }

  public deleteValue(val:any,index:any){
    this.orgSer.deleteValue(val.id).subscribe((res:any)=>{
      this.organizationInfo.values.splice(index,1);
    })
  }
  selectedValueIndex:any;
  onValueSelected(val:any,index:any){
    this.valueForm.controls["title"].patchValue(val.title);
    this.valueForm.controls["description"].patchValue(val.description);
    this.selectedValue = val;
    this.selectedValueIndex = index;
  }
}