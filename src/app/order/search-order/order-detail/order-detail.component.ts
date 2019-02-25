import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Order } from '../../../shared/models/order.modal';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Order) { }

  ngOnInit() {
  }

}
