import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducers';
import * as OrderActions from '../store/order.actions';
import * as fromOrder from '../store/order.reducers';
import { RateList } from '../../shared/models/rate-list.modal';
import { Order } from '../../shared/models/order.modal';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { PrintOrderComponent } from './print-order/print-order.component';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;
  isReady: Boolean = false;
  total = 0;
  totalItems = 0;
  submittedOrderId = 0;
  rateList = new Array<RateList>();
  count = 0;
  orderServices: string[] = [];
  orderItemName: string[] = [];
  rateListPrice = [];
  filteredOrderServices: Observable<string[]>[] = [];
  filteredOrderItems: Observable<string[]>[] = [];
  isFormValid = true;
  orderItems = new FormArray([]);
  constructor(private store: Store<fromApp.AppState>,
              public dialog: MatDialog,
              private formBuild: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.initForm();
   }
  ngOnInit() {
    this.store.dispatch(new OrderActions.FetchRateList());
    this.store.select('rateList').subscribe((state) => {
      this.rateList = state['rateList'];
      this.count = 1;
      if (!isNullOrUndefined(this.rateList['rateList'])) {
        this.filterRateList();
      }
    });
  }
  ManageNameControl(index: number) {
    const arrayControl = this.orderForm.get('orderItems') as FormArray;
    this.filteredOrderItems[index] = arrayControl.at(index).get('itemName').valueChanges
      .pipe(
        startWith<string>(''),
        map(name => name ? this._filter(name, 'I') : this.orderItemName.slice())
      );
    this.filteredOrderServices[index] = arrayControl.at(index).get('itemService').valueChanges
      .pipe(
        startWith<string>(''),
        map(value => value ? this._filter(value, 'S') : this.orderServices.slice())
      );
  }
  private _filter(value: string, key: string): string[] {
    const filterValue = value.toLowerCase();
    if (key === 'S') {
      return this.orderServices.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      return this.orderItemName.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
  onAddItem() {
    const contro = <FormArray>this.orderForm.controls['orderItems'];
    const formGroup = this.formBuild.group({
      itemName: ['', [Validators.required]],
      itemService: ['', [Validators.required]],
      itemPrice: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
    contro.push(formGroup);
    this.ManageNameControl(contro.length - 1);
  }
  filterRateList() {
    for (let index = 0; index < this.rateList['rateList'].length; index++) {
      this.orderItemName.push(this.rateList['rateList'][index].itemName);
      this.orderServices.push(this.rateList['rateList'][index].itemService);
    }
    this.orderItemName = this.orderItemName.filter((el, i, a) => i === a.indexOf(el));
    this.orderServices = this.orderServices.filter((el, i, a) => i === a.indexOf(el));
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.orderForm.get('orderItems')).removeAt(index);
    this.rateListPrice.splice(index, 1);
    this.findTotal();
  }
  onSubmit() {
    for (let index = 0; index < this.orderForm.value.orderItems.length; index++) {
      if (this.orderForm.value.orderItems[index].itemName === null || this.orderForm.value.orderItems[index].itemService === null
        || this.orderForm.value.orderItems[index].itemPrice === null) {
        this.isFormValid = false;
      }
    }
    if (this.isFormValid) {
      this.findTotal();
      this.store.dispatch(new OrderActions.CreateOrder(this.orderForm.value));
      this.store.select('orders').subscribe((state) => {
        this.submittedOrderId = state['order'].orderId;
        const orderDetail = state['order'];
        if (orderDetail.orderId !== undefined) {
          this.router.navigate(['printOrder']);
        }
      }, (error) => {
        this.submittedOrderId = 404;
      });
    }
  }

  private initForm() {
    this.orderForm = this.formBuild.group({
      orderItems: this.initItems(),
      comments: [''],
      customerContact: ['', [Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      totalAmount: [this.total],
      noOfItems: [this.totalItems, [Validators.pattern(/^[0-9]*$/)]]
    });
    this.ManageNameControl(0);
    this.isReady = true;
  }
  initItems() {
    const formArray = this.formBuild.array([]);

      formArray.push(this.formBuild.group({
        itemName: ['', [Validators.required]],
        itemService: ['', [Validators.required]],
        itemPrice: ['', [Validators.pattern(/^[0-9]*$/)]]
      }));
    return formArray;
  }

  findTotal() {
    let inputPrice = 0;
    this.total = 0;
    for (let index = 0; index < this.orderForm.value.orderItems.length; index++) {
      inputPrice = parseFloat(this.orderForm.value.orderItems[index].itemPrice);
      if (!Number.isNaN(inputPrice) && typeof inputPrice === 'number') {
        this.total = this.total + inputPrice;
      }
    }
    this.orderForm.value.totalAmount = this.total;
    this.totalItems = this.orderForm.value.orderItems.length;
    this.orderForm.value.noOfItems = this.totalItems;
  }
  openDialog(orderDetail: Order) {
    console.log(orderDetail);
    this.dialog.open(PrintOrderComponent, {
      data: orderDetail
    });
  }
  refreshPage(i: number) {
    if (i === 1) {
      for (let index = 0; index < this.orderForm.value.orderItems.length; index++) {
        this.onDeleteIngredient(index);
      }
      this.orderForm.reset();
    }
    this.submittedOrderId = 0;
    this.isFormValid = true;
  }
  findRateListPrice(i: number) {
    console.log(i);
    console.log(this.orderForm.value.orderItems[i].itemName);
    for (let index = 0; index < this.rateList['rateList'].length; index++) {
      if (this.rateList['rateList'][index].itemName === this.orderForm.value.orderItems[i].itemName &&
          this.rateList['rateList'][index].itemService === this.orderForm.value.orderItems[i].itemService) {
          this.rateListPrice[i] = this.rateList['rateList'][index].itemPrice;
          console.log(this.rateListPrice[i]);
          this.orderForm.value.orderItems[i].itemPrice = this.rateList['rateList'][index].itemPrice;
      }
    }
  }
}
