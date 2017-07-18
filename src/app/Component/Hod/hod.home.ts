import { Component } from '@angular/core';
import { OrganizationService2 } from '../../providers/organization.service2';
import { CommonService } from '../../providers/common.service';
import { Objective } from '../CommonTamplates/objective.component';

@Component({
  selector: 'hod-home',
  templateUrl: './hod.home.html',
  styleUrls: ['./../Coordinator/coordinator.home.css']
})
export class HodHome {

  public assignedActivities: any[] = [];
  constructor(private orgSer: OrganizationService2, private cs: CommonService) {    
    this.orgSer.fetchAssignedActivity().subscribe((res: any) => {
      if (res.status != 204) {
        this.assignedActivities = res;
        console.log(res);
      } else {
        this.assignedActivities = [];
      }
    });
  }

  logout(){
    localStorage.clear();
  }
}