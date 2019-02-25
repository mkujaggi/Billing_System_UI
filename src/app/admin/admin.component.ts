import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onCreateUser() {
    this.router.navigate(['createUser'], { relativeTo: this.route });
  }
  onGenerateReport() {
    this.router.navigate(['generateReport'], { relativeTo: this.route });
  }

}
