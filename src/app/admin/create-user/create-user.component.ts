import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import * as fromApp from '../../store/app.reducers';
import * as fromAdmin from '../store/admin.reducers';
import * as AdminActions from '../store/admin.actions';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../../shared/models/login.modal';
import { AdminService } from '../admin.service';
import { isNullOrUndefined } from 'util';
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private formBuild: FormBuilder, private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService) { }
  createUserForm: FormGroup;
  isReady: Boolean = false;
  passwordNotMatch = false;
  usernameNotAvail = false;
  // matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.createUserForm = this.formBuild.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      FName: ['', [Validators.required]],
      LName: [''],
      phoneNumber: ['', [Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
    this.isReady = true;
  }
  usernameAvailability() {
    console.log(this.createUserForm.value.username);
    if (!isNullOrUndefined(this.createUserForm.value.username) && this.createUserForm.value.username !== '') {
      this.adminService.checkUserAvailability(this.createUserForm.value.username).subscribe((val) => {
        if (val.length === 0) {
          console.log(val.length, 'hhhhh');
          this.usernameNotAvail = false;
          this.createUserForm.controls['username'].setErrors(null);
        } else {
          console.log(val.length, 'xxxx');
          this.createUserForm.controls['username'].setErrors({ 'incorrect': true });
          this.usernameNotAvail = true;
        }
      });
    }
    // this.store.dispatch(new AdminActions.UsernameAvailability(this.createUserForm.value.username));
    // if (isAvailable) {
    //   console.log('falsekaj', isAvailable);
    //   this.usernameNotAvail = false;
    // } else {
    //   console.log('trueakjsdhk', isAvailable);
    //   this.usernameNotAvail = true;
    // }
  }
  checkPassword() {
    console.log(this.createUserForm.value.password);
    if (this.createUserForm.value.password === this.createUserForm.value.confirmPassword) {
      this.passwordNotMatch = false;
      this.createUserForm.controls['confirmPassword'].setErrors(null);
    } else {
      this.passwordNotMatch = true;
      this.createUserForm.controls['confirmPassword'].setErrors({ 'incorrect': true });
      console.log('not mat' , this.createUserForm.value.password);
    }
  }
  onSubmit() {
    const userDetails: Login = this.createUserForm.value;
    console.log(userDetails, 'asjgdjasgd');
    this.store.dispatch(new AdminActions.TryCreateUser(userDetails));
    this.store.select('user').subscribe((state) => {
      this.router.navigate(['adminDash']);
    });
  }

}
