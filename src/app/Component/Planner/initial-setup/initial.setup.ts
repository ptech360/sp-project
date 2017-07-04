import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { Router } from '@angular/router';
import { OrganizationService2 } from '../../../providers/organization.service2';
@Component({
  selector:'initialSetup',
  templateUrl:'./initial.setup.html',
  styleUrls:['']
})
export class InitialStetup{
    cmvvForm: FormGroup;
  uid:any;
  constructor(public formBuilder: FormBuilder,
              public orgService: OrganizationService2,
              public commonService: CommonService,
              private router: Router) { 
                 if (this.commonService.getData('org_info')[0].cycles) {
                    this.router.navigate(['/'+this.commonService.getData('user_roleInfo')[0].role+'-home']);
                  }
              }

  ngOnInit() {
     this.uid = this.getUniversity();
     this.cmvvForm = this.formBuilder.group({
      "startCycle": ['', [Validators.required]],
      "endCycle": ['', [Validators.required]],
      "mission": ['', [Validators.required]],
      "vision": ['', [Validators.required]],
      "values": this.formBuilder.array([this.inItValue()])
    });
  }

  inItValue() {
    return this.formBuilder.group({
      "title": ['', [Validators.required]],
      "description": ['', [Validators.required]]
    });
  }

  removeValue(index:any) {
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.removeAt(index);
  }

  addValue() {
    const control = <FormArray>this.cmvvForm.controls['values'];
    control.push(this.inItValue());
  }

  returnObject:any[] = [];
  cycle:any[] = [];
  submitted: boolean = false;

  getUniversity(){
    this.orgService.getUniversities().subscribe(response =>{
      this.uid = response[0].id;
    }, error =>{
      console.log(error);
    })
  }

  onSubmit() {    
    this.cmvvForm.value['universityId'] = 213973813;
    var startYear = new Date(this.cmvvForm.value.startCycle).getFullYear();
    var endYear = new Date(this.cmvvForm.value.endCycle).getFullYear();
    for (var y = startYear; y <= endYear; y++)
      this.cycle.push(y);

    this.cmvvForm.value['cycle'] = {
      "startCycle": this.cmvvForm.value.startCycle,
      "endCycle": this.cmvvForm.value.endCycle
    };
    delete this.cmvvForm.value['startCycle'];
    delete this.cmvvForm.value['endCycle'];
    this.orgService.orgInitialSetup(this.cmvvForm.value).subscribe(res => {
      this.returnObject.push(res);
      this.returnObject['cycle'] = this.cycle;
      this.commonService.storeData('org_info',this.returnObject)
      this.router.navigate(['/planner']);
    }, (error) => {
      console.log(error);
    })
  }
}