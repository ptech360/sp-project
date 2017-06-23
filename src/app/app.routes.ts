import { Routes } from '@angular/router';

/*Components*/
import { Login } from './Component/Login/login';
import { AdminHome } from './Component/Admin/admin.home';
import { NewUniversity } from './Component/Admin/university/new.university.component';
import { NewDepartment } from './Component/Admin/department/new.department.component';
import { NewEmployee } from './Component/Admin/employee/new.employee';
import { ExistingDepartment } from './Component/Admin/department/existing.department.component';
import { AddRole } from './Component/Admin/employee/role/add.role.component';
export const rootRouterConfig: Routes = [
  { path: '', redirectTo : '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'admin', component:AdminHome,
    children:[
      { path: 'new-university', component:NewUniversity, },
      { path: 'new-department', component:NewDepartment, },
      { path: 'new-employee', component:NewEmployee, },
      { path: 'existing-department', component:ExistingDepartment, },
      { path: 'add-role', component:AddRole}
    ]
  },
  
];