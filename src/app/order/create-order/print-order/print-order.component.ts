import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order.modal';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import jsPDF from 'jspdf';

declare var $: any;
declare var JsBarcode: any;
@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css']
})
export class PrintOrderComponent implements OnInit {

  data: Order;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {
   }

  ngOnInit() {
    this.store.select('orders').subscribe((state) => {
      const orderDetail = state['order'];
      if (orderDetail.orderId !== undefined) {
        this.data = orderDetail;
      }
    }, (error) => {
      console.log(error);
    });
    // JsBarcode('#code128', this.data.orderId);
    // const printContents = document.getElementById('invoice-template').innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
    // const template = document.getElementsByClassName('invoice');
  }
  closeDialog() {
    this.router.navigate(['/']);
  }
  printElement() {
    const doc = new jsPDF();
    doc.line(5, 5, 205, 5);
    doc.line(5, 50, 205, 50);
    doc.line(150, 50, 150, 222);
    doc.line(5, 5, 5, 222);
    doc.line(5, 222, 205, 222);
    doc.line(205, 5, 205, 222);
    doc.line(5, 60, 205, 60);
    doc.text('OrderId: ' + this.data.orderId, 110, 15);
    doc.text('Received Date: ' + this.data.orderReceivedDate, 110, 23);
    doc.text('Item', 25, 56);
    doc.text('Service', 85, 56);
    doc.text('Price', 170, 56);
    doc.line(5, 210, 205, 210);
    doc.text('Total', 90, 217);
    doc.text('White House', 25, 15);
    doc.text('Drycleaners', 29, 15);
    const xi = 25;
    let y = 70;
    const xs = 85;
    const xp = 170;
    for (let i = 0; i < this.data.orderItems.length; i++) {
      doc.text(this.data.orderItems[i].itemName, xi, y);
      doc.text(this.data.orderItems[i].itemService, xs, y);
      doc.text(this.data.orderItems[i].itemPrice.toString(), xp, y);
      y += 10;
    }
    doc.text(this.data.totalAmount.toString(), 170, 217);
    doc.autoPrint();
    doc.save('invoice.pdf');
  }

}
