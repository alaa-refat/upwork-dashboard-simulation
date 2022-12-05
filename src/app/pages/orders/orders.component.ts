import { Jobs } from './../../models/jobs';
import { JobsService } from './../../services/jobs.service';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbarservices/navbar.service';
import { SidebarService } from 'src/app/services/sidebarservices/sidebar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  jobs: Jobs[];
  hiredjobs: Jobs[];
  Pendingjobs: Jobs[];
  page: Number = 1;
  total: Number;
  constructor(
    private jobServ: JobsService,
    public nav: NavbarService,
    public side: SidebarService
  ) {}

  ngOnInit(): void {
    this.nav.show();
    this.side.show();
    this.jobServ.getJobs().subscribe(
      (res) =>
        (this.jobs = res.map((e) => {
          console.log(e.payload.doc.data());
          return {
            ...(e.payload.doc.data() as object),
          } as Jobs;
        }))
    );
    console.log(this.jobs);

    this.jobServ.getJobsHired().subscribe(
      (res) =>
        (this.hiredjobs = res.map((e) => {
          console.log(e.payload.doc.data());
          return {
            ...(e.payload.doc.data() as object),
          } as Jobs;
        }))
    );

    this.jobServ.getJobsPending().subscribe(
      (res) =>
        (this.Pendingjobs = res.map((e) => {
          console.log(e.payload.doc.data());
          return {
            ...(e.payload.doc.data() as object),
          } as Jobs;
        }))
    );
  }
}
