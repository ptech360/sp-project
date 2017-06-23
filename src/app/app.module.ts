import { NgModule } from '@angular/core';
import { RequestOptions, HttpModule, XHRBackend } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Components */
import { AppComponent } from './app.component';
import { Login } from './Component/Login/login';
import { CustomHttpService } from './providers/default.header.service';
/* Providers */
import { LoggedInGuard } from './Component/Login/login.guard';
@NgModule({
  imports: [BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot(rootRouterConfig, { useHash: true })],
  declarations: [AppComponent, Login],
  bootstrap: [AppComponent],
  providers: [
    LoggedInGuard,
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
