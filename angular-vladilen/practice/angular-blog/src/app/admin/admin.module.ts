import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';

import {AuthGuardService} from './shared/services/auth-guard.service';
import {AlertService} from './shared/services/alert.service';

import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService]},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuardService]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuardService]},
        ]
      }
    ])
  ],
  providers: [
    AuthGuardService,
    AlertService
  ],
  exports: [RouterModule]
})
export class AdminModule {
}
