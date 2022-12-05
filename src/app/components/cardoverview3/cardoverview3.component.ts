import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/models/jobs';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-cardoverview3',
  templateUrl: './cardoverview3.component.html',
  styleUrls: ['./cardoverview3.component.css'],
})
export class Cardoverview3Component implements OnInit {
  jobs: Jobs[];
  jobsLength: number;
  constructor(private jobserv: JobsService) {}

  ngOnInit(): void {
    this.jobserv.getJobs().subscribe((res) => {
      this.jobsLength = res.length;
    });
  }
}
