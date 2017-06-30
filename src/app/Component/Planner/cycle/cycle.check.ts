import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService} from '../../../providers/common.service';
@Injectable()
export class HaveCycle implements CanActivate {

  constructor(private router: Router,private commonService:CommonService) {

  }

  canActivate() {
    if(this.commonService.getData("org_info")[0].cycles)
      return true;
     
      this.router.navigateByUrl("/planner/initialSetup");
      return false;
  }
}