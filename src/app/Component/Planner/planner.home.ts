import {Component} from '@angular/core';
import { CommonService } from '../../providers/common.service';
@Component({
  selector:'planner',
  templateUrl:'./planner.home.html',
  styleUrls:['./planner.home.css']
})
export class PlannerHome{
  constructor(private cs:CommonService){
  }
  logout(){
    localStorage.clear();
  }
}