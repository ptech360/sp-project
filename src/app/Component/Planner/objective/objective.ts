import {Component, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import {OrganizationService2} from '../../../providers/organization.service2';
import {CommonService} from '../../../providers/common.service';

declare let $:any;
declare let angular:any;
@Component({
  selector:'objective',
  templateUrl:'./objective.html',
  styleUrls:['./objective.css']
})
export class ObjectiveComponent implements AfterViewInit{
  public objectives : any[];
  public empty:boolean =false;
  public selectedObjective :any;
  public selectedInitiative:any;
  public objectiveForm: FormGroup;
  public initiativeForm: FormGroup;
  public activityForm: FormGroup;
  public measureForm: FormGroup;
  public selectedActivity:any;
  public quarter:any[] = ["First","Second","Third","Forth"];
  public departmentIds:any[];
  constructor(private orgSer:OrganizationService2,
              private commonService:CommonService,
              public formBuilder: FormBuilder){
    orgSer.fetchObjectives(commonService.getData('org_info').cycles.id).subscribe((res:any)=>{
      if(res.status == 204){
        this.empty = false;
        this.objectives = [];        
      }else{
        this.objectives = res;
      }
      console.log(res);
    });
    this.initObjectiveForm();
    this.initiativeForm = this.initForm();
    this.activityForm = this.setActivity();
    this.measureForm = this.setMeasure();
  }

  // getInitiative(objectiveId:any){
  //   this.orgSer.fetchInitiative(objectiveId).subscribe( (res:any) =>{
  //     this.initiatives = res.initiatives;
  //   })
  // }

  ngAfterViewInit(){
    $('.panel-collapse').on('hidden.bs.collapse', function () {
      // find the children and close them
      $(this).find('.collapse').collapse('hide');
    });
  }
  /**Objective Component */
  initObjectiveForm() {
    this.objectiveForm = this.formBuilder.group({
      "objective": ['', [Validators.required]],
      "totalCost": ['', [Validators.required]],
      "spis": this.formBuilder.array([this.inItSpi()]),
    });
  }
  inItSpi() {
    return this.formBuilder.group({
      "spi": ['', [Validators.required]],
      "measureUnit": ['', [Validators.required]],
      "currentLevel": ['', [Validators.required]],
      "frequencyId":[1],
      "targetDigital": this.formBuilder.array(this.inItTarget())
    });
  }
  inItTargetDigital(year:any) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "expectedLevel": ['', [Validators.required]],
    });
  }  
  inItTarget() {
    const fa:any[] = [];
    this.commonService.getData('org_info').cycle.forEach((element:any) => {
      fa.push(this.inItTargetDigital(element));
    });
    return fa;
  }

  addSpi(form:any) {
    const control = <FormArray>form.controls['spis'];
    control.push(this.inItSpi());
  }

  removeSpi(form:any, index:any) {
    const control = <FormArray>form.controls['spis'];
    control.removeAt(index);
  }

  returnedObject:any;
  onSubmit() {
    this.objectiveForm.value["cycleId"] = this.commonService.getData('org_info').cycles.id;
    this.orgSer.addObjective(this.objectiveForm.value).subscribe((response:any) => {
      $('#objectiveModal').modal('hide');
      this.returnedObject = response;
      this.objectives.push(this.returnedObject);
      this.initObjectiveForm();
    }, (error:any) => {
      console.log(error);
    });
  }
/**************** end of objective component ***********************/
/**************** Initiative Component ************************** */
initForm(){
    return this.formBuilder.group({
      "initiative": ['', [Validators.required]],
      "totalCost": ['', [Validators.required]],
      "activities": this.formBuilder.array([this.setActivity()])
    });
  }
  addActivity(form:any) {
    const control = <FormArray>form.controls['activities'];
    control.push(this.setActivity());
  }
  removeActivity(form:any, i:any) {
    const control = <FormArray>form.controls['activities'];
    control.removeAt(i);
  }
  addMeasure(form:any) {
    const control = <FormArray>form.controls['measures'];
    control.push(this.setMeasure());
  }
  removeMeasure(form:any, j:any) {
    const control = <FormArray>form.controls['measures'];
    control.removeAt(j);
  }
  setActivity() {
    return this.formBuilder.group({
      "activity": ['', [Validators.required]],
      "measures": this.formBuilder.array([this.setMeasure()])
    });
  }
  setMeasure() {
    return this.formBuilder.group({
      "measure": ['', [Validators.required]],
      "frequencyId": [1, [Validators.required]],
      "measureUnit": ['', [Validators.required]],
      "currentLevel": ['', [Validators.required]],
      "direction": ['', [Validators.required]],
      "annualTarget": this.formBuilder.array(this.setAnnualTarget())
    });
  }
  setAnnualTarget() {
    const annualTarget:any[] = [];
    this.commonService.getData('org_info').cycle.forEach((element:any) => {
      annualTarget.push(this.inItTargetIn(element));
    });
    return annualTarget;
  }
  inItTargetIn(year:any) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "levels": this.formBuilder.array([this.inItLevels(this.quarter[0])]),
      "estimatedCost": ['', [Validators.required]]
    });
  }
  setTargetTable(form:any, e:any) {
    for (var index = 0; index < this.commonService.getData('org_info').cycle.length; index++) {
      form[index].controls['levels'] = this.formBuilder.array([]);
      const levels = <FormArray>form[index].controls['levels'];
      for (var i = 0; i < e; i++) {
        levels.push(this.inItLevels(this.quarter[i]));
      }
    }
  }
  inItLevels(q:any) {
    return this.formBuilder.group({
      "quarter": [q],
      "startDate": ["2017-04-01"],
      "endDate":["2018-04-15"],
      "estimatedTargetLevel": ['', [Validators.required]]
    });
  }

  submitInitiative() {
    this.initiativeForm.value['objectiveId'] = this.selectedObjective.id;
    this.orgSer.addInitiative(this.initiativeForm.value).subscribe((res:any) => {
      this.selectedObjective.initiatives.push(res);
      $('#initiativeModal').modal('hide');
      this.initForm();
    }, err => {
      console.log(err);
    });
  }

  submitActivity(){
    this.activityForm.value['initiativeId'] = this.selectedInitiative.id;
    this.orgSer.saveActivity(this.activityForm.value)
    .subscribe(response =>{
      this.selectedInitiative.activities.push(response);
      $('#activityModal').modal('hide');
      this.activityForm = this.setActivity();
    });    
  }

  submitMeasure(){
    this.measureForm.value['activityId'] = this.selectedActivity.id;
    this.orgSer.saveMeasure(this.measureForm.value).subscribe((response:any) =>{
      this.measureForm = this.setMeasure();
      this.selectedActivity.measures.push(response);
      $('#measureModal').modal('hide');
    }, error =>{
      console.log(error);
    });
  }

  public assignActivity(activity:any){
    this.orgSer.assignActivity(activity.id,this.departmentIds).subscribe((res:any) =>{
      activity.assignedDepartments = activity.assignedDepartments.concat(res);      
      activity.otherDepartments.forEach((oelement:any,index:any) => {        
        this.departmentIds.forEach((ielement:any) => {
          if(ielement == oelement.departmentId){
            if (index !== -1) {
              activity.otherDepartments.splice(index, 1);
            }
          }
        });
      });
    }, error =>{
      console.log(error);
    });
  }

  getObjElement(event:any){
    $('.objective').addClass('hideBtn');
    if(!event.srcElement.classList.contains('collapsed'))
      $('.objective').addClass('hideBtn');          
    else
      event.srcElement.nextElementSibling.classList.remove('hideBtn');  
  }

  getIniElement(event:any){
    $('.initiative').addClass('hideBtn');
    if(!event.srcElement.classList.contains('collapsed'))
      $('.initiative').addClass('hideBtn');          
    else
      event.srcElement.nextElementSibling.classList.remove('hideBtn');
  }

  getActElement(event:any){
    $('.activity').addClass('hideBtn');
    if(!event.srcElement.classList.contains('collapsed'))
      $('.activity').addClass('hideBtn');        
    else
      event.srcElement.nextElementSibling.classList.remove('hideBtn');
  }

  getRowSpan(array:any[]){
    var rowSpan = 1;
    rowSpan += array.length;
    array.forEach((element) => {
      rowSpan += element.activities.length;
      element.activities.forEach((innerElement:any) => {
        rowSpan += innerElement.measures.length;
      });
    });
    if(rowSpan == 1)
      return rowSpan+1;
    return rowSpan;
  }

  getRowSpanOfIni(array:any[]){
    var rowSpan = 1;
    rowSpan += array.length*2;
      array.forEach((innerElement:any) => {
        rowSpan += innerElement.measures.length;
      });
      return rowSpan;
  }
}