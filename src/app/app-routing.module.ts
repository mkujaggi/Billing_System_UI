import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { SearchOrderComponent } from './order/search-order/search-order.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { PrintOrderComponent } from './order/create-order/print-order/print-order.component';
import { GenerateReportComponent } from './admin/generate-report/generate-report.component';

const appRoute: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'createOrder', component: CreateOrderComponent, canActivate: [AuthGuardService]},
  { path: 'printOrder', component: PrintOrderComponent},
  { path: 'searchOrder', component: SearchOrderComponent, canActivate: [AuthGuardService]},
  { path: 'editOrder', component: EditOrderComponent, canActivate: [AuthGuardService]},
  { path: 'adminDash', component: AdminComponent, children: [
    { path: '', component: AdminComponent, canActivate: [AuthGuardService]},
    { path: 'createUser', component: CreateUserComponent, canActivate: [AuthGuardService]},
    { path: 'generateReport', component: GenerateReportComponent, canActivate: [AuthGuardService] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
 }
