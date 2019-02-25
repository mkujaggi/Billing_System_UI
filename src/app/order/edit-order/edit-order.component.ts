import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../shared/models/order.modal';
import { Store } from '@ngrx/store';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as OrderActions from '../store/order.actions';
import { isUndefined } from 'util';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }
  orderDetails: Order;
  orderEditForm: FormGroup;
  editedOrderId = 0;
  ngOnInit() {
    this.initForm();
    console.log(this.orderDetails);
    this.store.select('orders').subscribe((state) => {
      this.orderDetails = state['order'];
      if (this.orderDetails.customerContact === undefined) {
        this.orderDetails.customerContact = null;
      }
      if (isUndefined(this.orderDetails)) {
        console.log('redirecting...');
        this.router.navigate(['/createOrder']);
      }
      for (let index = 0; index < this.orderDetails.noOfItems; index++) {
        (<FormArray>this.orderEditForm.get('orderItems')).push(
          new FormGroup({
            'itemName': new FormControl(null, Validators.required),
            'isCompleted': new FormControl(null, Validators.required),
            'isDelivered': new FormControl(null, Validators.required)
          })
        );
      }
    }, (err) => { this.router.navigate(['/createOrder']); });
  }
  initForm() {
    const orderItems = new FormArray([]);
    this.orderEditForm = new FormGroup({
      'orderItems': orderItems,
      'comments': new FormControl(null),
      'customerContact': new FormControl(null,
        Validators.pattern(/^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/)),
      'orderStatus': new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    this.store.dispatch(new OrderActions.SubmitEditOrder(this.orderDetails));
    this.store.select('orders').subscribe((state) => {
      if (state.orders.orderId === this.orderDetails.orderId) {
        this.editedOrderId = state.orders.orderId;
      }
      console.log(this.editedOrderId);
    });
    setTimeout(() => {
      this.router.navigate(['/searchOrder']);
    }, 2000);
  }

}
