import { Routes } from '@angular/router';

/*Components*/
import { Login } from './Component/Login/login';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo : '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
];