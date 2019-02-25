import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule
  , MatDialogModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor, ErrorInterceptor } from './shared/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effects';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { OrderEffects } from './order/store/order.effects';
import { SearchOrderComponent } from './order/search-order/search-order.component';
import { FilterPipe } from './shared/filter/filter.pipe';
import { OrderDetailComponent } from './order/search-order/order-detail/order-detail.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { PrintOrderComponent } from './order/create-order/print-order/print-order.component';
import { AdminComponent } from './admin/admin.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { AdminEffect } from './admin/store/admin.effects';
import { GenerateReportComponent } from './admin/generate-report/generate-report.component';
import { AdminService } from './admin/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    CreateOrderComponent,
    SearchOrderComponent,
    FilterPipe,
    OrderDetailComponent,
    EditOrderComponent,
    PrintOrderComponent,
    AdminComponent,
    CreateUserComponent,
    GenerateReportComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffect, OrderEffects, AdminEffect])
  ],
  entryComponents: [
    OrderDetailComponent,
    PrintOrderComponent,
    AdminComponent
  ],
  providers: [AuthService, AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
