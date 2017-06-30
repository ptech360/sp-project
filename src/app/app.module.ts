import { NgModule } from '@angular/core';
import { RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Components */
import { AppComponent } from './app.component';
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
import { ObjectiveComponent } from './Component/Planner/objective/objective';
/* Providers */
import { LoggedInGuard } from './Component/Login/login.guard';
import { HaveCycle } from './Component/Planner/cycle/cycle.check';
import { AdminService } from './providers/admin.service';
import { CommonService } from './providers/common.service';
import { CredentialService } from './providers/credential.service';
import { OrganizationService2 } from './providers/organization.service2';
import { CustomHttpService } from './providers/default.header.service';
@NgModule({
  imports: [BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot(rootRouterConfig, { useHash: true })],
  declarations: [AppComponent, Login, Home, AdminHome, NewUniversity, NewDepartment, NewEmployee, AddRole, ExistingDepartment, PlannerHome, InitialStetup, CycleComponent, ObjectiveComponent],
  bootstrap: [AppComponent],
  providers: [LoggedInGuard, CredentialService, CommonService, AdminService, OrganizationService2, HaveCycle,
    {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    },
  ]
})
export class AppModule { }
