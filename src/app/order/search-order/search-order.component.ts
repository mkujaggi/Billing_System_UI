import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent, MatDialog } from '@angular/material';

import * as fromOrder from '../store/order.reducers';
import { Order } from '../../shared/models/order.modal';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { Router } from '@angular/router';
import * as OrderActions from '../store/order.actions';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {

  constructor(private store: Store<fromOrder.OrderState>, public dialog: MatDialog,
              private router: Router) { }
  orderList: Observable<fromOrder.State>;
  filteredStatus = '';
  displayedColumns: string[] = ['orderId', 'orderReceivedDate', 'noOfItems', 'orderStatus', 'totalAmount', 'viewEdit'];
  orders = new Array<Order>();
  private paginator: MatPaginator;
  private sort: MatSort;
  pageEvent: PageEvent;
  dataSource = new MatTableDataSource(this.dataSource);
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.orderList = this.store.select('orderList');
    this.orderList.subscribe((order) => {
      this.orders = order.orderList;
      this.dataSource = new MatTableDataSource(this.orders['orders']);
    });
    this.orderList.subscribe((newData) => {
      this.dataSource = new MatTableDataSource(newData.orderList['orders']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(orderDetails: Order) {
    this.dialog.open(OrderDetailComponent, {
      data: orderDetails
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editOrder(editOrder: Order) {
    this.store.dispatch(new OrderActions.EditOrder(editOrder));
    this.router.navigateByUrl('/editOrder');
  }
}
