import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { defaultFormat as _rollupMoment } from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { isNullOrUndefined } from 'util';
import * as d3 from 'd3';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class GenerateReportComponent implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(Date.now());
  startValue = new Date();
  isReady: Boolean = false;
  genReport: FormGroup;
  constructor(private adminService: AdminService, private formBuild: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.genReport = this.formBuild.group({
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]]
    });
    this.isReady = true;
  }
  onSubmit() {
    let totalSales = 0;
    if (!isNullOrUndefined(this.genReport.value.dateStart) && this.genReport.value.dateStart !== '') {
      this.adminService.generateReport(this.genReport.value.dateStart, this.genReport.value.dateEnd).subscribe(
        (val) => {
          console.log(val['orders'].length);
          for (let index = 0; index < val['orders'].length; index++) {
            totalSales += val['orders'][index].totalAmount;
            if (val['orders'][index].orderStatus === 'Delivered') {
              const totalAmount = val['orders'][index].totalAmount;
              console.log('total', totalAmount);
            }
          }
          console.log('sales', totalSales);
        }
      );
    }
  }
}
