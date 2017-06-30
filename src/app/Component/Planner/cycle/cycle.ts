import {Component, OnInit} from '@angular/core';
import { CommonService } from '../../../providers/common.service';
@Component({
  selector:'cycle',
  templateUrl:'./cycle.html',
  styleUrls:['./../planner.home.css']
})
export class CycleComponent implements OnInit {

  organizationInfo:any;

  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.organizationInfo = this.commonService.getData('org_info');
    console.log("DSADAS", this.organizationInfo)
  }
}