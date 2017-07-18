import {Component} from '@angular/core';
import {OrganizationService2} from '../../providers/organization.service2';
import { CommonService } from '../../providers/common.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

declare let $:any;

@Component({
  selector:'coordinator-home',
  templateUrl:'./coordinator.home.html',
  styleUrls:['./../Planner/objective/objective.css','./coordinator.home.css']
})
export class CoordinatorHome{
  public assignedActivities:any[] = [];
  public evidencForm:FormGroup;
  constructor(private orgSer:OrganizationService2,private cs:CommonService){
    this.evidencForm = new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',Validators.required),
      files:new FormControl('',[Validators.required])
    });

    this.orgSer.fetchAssignedActivity().subscribe((res:any) =>{
      if(res.status != 204){
        this.assignedActivities = res;
      }else{
        this.assignedActivities = [];
      }
    })
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

  logout(){
    localStorage.clear();
  }
}