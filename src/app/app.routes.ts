import { Routes } from '@angular/router';

/*Components*/
import { Login } from './Component/Login/login';
import { Home } from './Component/Admin/home/home';
import { AdminHome } from './Component/Admin/admin.home';
import { NewUniversity } from './Component/Admin/university/new.university.component';
import { NewDepartment } from './Component/Admin/department/new.department.component';
import { NewEmployee } from './Component/Admin/employee/new.employee';
import { ExistingDepartment } from './Component/Admin/department/existing.department.component';
import { AddRole } from './Component/Admin/employee/role/add.role.component';
import { PlannerHome } from './Component/Planner/planner.home';
import { InitialStetup } from './Component/Planner/initial-setup/initial.setup';
import { CycleComponent } from './Component/Planner/cycle/cycle';
import { ObjectiveComponent} from './Component/Planner/objective/objective';
import { CoordinatorHome } from './Component/Coordinator/coordinator.home';
import { HodHome } from './Component/Hod/hod.home';

import { LoggedInGuard } from './Component/Login/login.guard';
import { HaveCycle } from './Component/Planner/cycle/cycle.check';
export const rootRouterConfig: Routes = [
  { path: '', redirectTo : '/login', pathMatch: 'full'},
  { path: 'login', component: Login },
  { path: 'admin', component:AdminHome, canActivate: [LoggedInGuard],
    children:[
      {path: 'home', component:Home},
      { path: 'new-university', component:NewUniversity , canActivate: [LoggedInGuard] },
      { path: 'new-department', component:NewDepartment, canActivate: [LoggedInGuard] },
      { path: 'new-employee', component:NewEmployee, canActivate: [LoggedInGuard] },
      { path: 'existing-department', component:ExistingDepartment, canActivate: [LoggedInGuard] },
      { path: 'add-role', component:AddRole, canActivate: [LoggedInGuard]}
    ]
  },
  { path:'planner', component:PlannerHome,  canActivate: [LoggedInGuard],
    children:[
      { path: 'initialSetup', component:InitialStetup,},
      { path: '', component:CycleComponent,  canActivate: [HaveCycle]},
      { path: 'objective', component:ObjectiveComponent}
    ]
  },
  { path:'coordinator', component:CoordinatorHome, canActivate:[LoggedInGuard]},
  { path:'hod', component:HodHome, canActivate:[LoggedInGuard]}
  
];