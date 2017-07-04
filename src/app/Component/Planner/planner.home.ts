import {Component} from '@angular/core';
@Component({
  selector:'planner',
  templateUrl:'./planner.home.html',
  styleUrls:['./planner.home.css']
})
export class PlannerHome{
  constructor(){
  }
  logout(){
    localStorage.clear();
  }
}