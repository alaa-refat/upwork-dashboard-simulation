import { Component } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Jobs } from 'src/app/models/jobs';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-barlinechart',
  templateUrl: './barlinechart.component.html',
  styleUrls: ['./barlinechart.component.css'],
})
export class BarlinechartComponent {
  publicJobsLength: number;
  hiredJobsLength: number;
  closedJobsLength: number;
  constructor(private jobservice: JobsService) {
    this.jobservice.getJobsHired().subscribe((res) => {
      this.hiredJobsLength = res.length;
      console.log(this.hiredJobsLength);
    });

    this.jobservice.getJobsClosed().subscribe((res) => {
      this.closedJobsLength = res.length;
    });
    this.jobservice.getJobsPublic().subscribe((res) => {
      this.publicJobsLength = res.length;
    });
  }
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = ['public Jobs', 'Hired Jobs', 'Closed Jobs'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  ngOnInit() {}

  barChartData: ChartDataSets[] = [
    // { data: [10, 15, 18], label: 'Jobs Dataset' },
    { data: [280, 480, 400, 790, 960, 887, 140], label: 'Dataset2' }
  ];

  barChartColors: Color[] = [
    {
      backgroundColor: '#75C181',
      borderColor: '#75C181',
    },
    // {
    //   backgroundColor: '#5B99EA',
    //   borderColor: '#5B99EA',
    // }
  ];
}
