import {Component} from '@angular/core';
import {OrganizationService2} from '../../providers/organization.service2';
import { CommonService } from '../../providers/common.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
declare let $:any;

@Component({
  selector:'coordinator-home',
  templateUrl:'./coordinator.home.html',
  styleUrls:['./../Planner/objective/objective.css','./coordinator.home.css', './../Planner/planner.home.css']
})
export class CoordinatorHome{
  public displayProfile:boolean=true;
  public assignedActivities:any[] = [];
  public evidencForm:FormGroup;
  public departments:any = []
  public discussionForm:FormGroup;
  public currentUser:any;
  constructor(private orgSer:OrganizationService2,private cs:CommonService){
    this.cs.getData('user_roleInfo').forEach((element:any) => {
      this.departments.push(element.departmentId);
    });
    this.evidencForm = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',Validators.required),
      files:new FormControl('',[Validators.required])
    });
    this.discussionForm = new FormGroup({
      comment:new FormControl('',[Validators.required])
    });
    this.orgSer.fetchAssignedActivity(this.departments).subscribe((res:any) =>{
      if(res.status != 204){
        this.assignedActivities = res;
      }else{
        this.assignedActivities = [];
      }
    });
    this.currentUser = this.cs.getData('userDetails').id;
  }

  saveResult(e:any){
    var result ={
      "currentLevel":e.currentLevel,
      "currentCost":e.currentCost,
      "departmentId":this.cs.getData("user_roleInfo")[0].departmentId,
    }
    if(e.status == null){
      result["quarterId"] = e.quarterId;
      this.orgSer.saveQuarteResult(result,e.quarterId).subscribe((res:any)=>{
        console.log("success",res);
        e.status = "inprogress";  
        e.id = res.results[0].id;      
      });
    }else{
      this.orgSer.updateQuarteResult(result,e.id).subscribe((res:any)=>{
        console.log("success");
        e.status = "inprogress";
      });
    }
  }

  file:any;
  getFile(event:any) {
    this.file = event.srcElement.files[0];
    console.log(event.srcElement.files[0]);
  }
  selectedQuarter:any;
  onEvidenceSubmit(){
    let formData = new FormData();
    formData.append('title',this.evidencForm.value['title']);
    formData.append('description',this.evidencForm.value['description']);
    formData.append('file',this.file);
    console.log(this.evidencForm.value);
    this.orgSer.saveEvidence(formData,this.selectedQuarter.id).subscribe((res:any)=>{
      if(!this.selectedQuarter.evidance)
        this.selectedQuarter.evidance = [];
      this.selectedQuarter.evidance.push(res);
      $('#evidenceForm').modal('hide');
    });
  }

  commentPost(){
    this.discussionForm.value["quarterLevelResultId"] = this.selectedQuarter.id;
    this.discussionForm.value["employeeId"] = this.cs.getData('userDetails').id;
    this.discussionForm.value["commentedOn"] = new Date();
    this.orgSer.saveComment(this.selectedQuarter.id,this.discussionForm.value).subscribe((response:any) =>{
      console.log(response);
    })
  }

  lockResult(lev:any){
    this.orgSer.lockResult(lev.id).subscribe((res:any)=>{
      lev.status = "locked"
      console.log(res);
    })
  }

  logout(){
    localStorage.clear();
  }

}