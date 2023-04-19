import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { NgToastService } from 'ng-angular-popup';
import { SuccessDialogComponentComponent } from 'src/app/admin/create-account/success-dialog-component/success-dialog-component.component';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
@Component({
   templateUrl: './dash-board.component.html',
   styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {

   constructor(public dialog: MatDialog, private api: ApiService, private router: Router,
      private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) { }
   ngDashboard!: any;
   dataCategory: any[] = [];
   dataDepartment: any[] = [];
   dataChartByMonth: any[] = [];
   highcharts = Highcharts;

   chartOptions2!: any

   chartOptions3!: any 

   chartOptions4!: any

   chartOptions5!: any 

   ngOnInit(): void {
      this.api.getDashboard().subscribe((res: any) => {
         this.ngDashboard = res.data;
         this.dataCategory = res.data.category;
         this.dataDepartment = res.data.department;
         this.dataChartByMonth = res.data.dataChartByMonth;
         
        this.dataChartByMonth.map((item: any) => { console.log(item)});

      //    this.chartOptions2.xAxis.categories = this.dataCategory.map((item: any) => item.name);
      //   this.chartOptions2.series[0].data = this.dataCategory.map((item: any) => item.count);
      //   Highcharts.chart('chart',this.chartOptions2);

      this.chartOptions2 = {
         chart: {
            type: 'bar',
         },
         title: {
            text: 'Number idea of category',
         },
         xAxis: {
            categories: res.data.category.map((item: any) => item.name),
            title: {
               text: 'Category',
            },
         },
         yAxis: {
            title: {
               
               text: 'Number of Ideas',
            },
         },
         tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><br/>',
            pointFormat: '<b>{point.y}</b> ideas',
         },
         series: [
            {
               name: 'Number of Ideas',
               data:  res.data.category.map((item: any) => item.totalIdea),
            },
         ],
      };


      this.chartOptions3 = {
         chart: {
            type: 'pie',
            // width: 400,
            // height: 300,
         },
         title: {
            text: 'Total ideas by department',
         },
         series: [
            {
               name: 'Total ideas',
               data: this.dataDepartment.map((item: any) => {
                  return {
                     name: item.name,
                     y: item.totalIdea ,
                     
                  }
               }),
               showInLegend: true,
            },
         ],
         tooltip: {
            pointFormat: '<b>{point.y}</b> ideas',
         },
         plotOptions: {
            pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y} ideas',
               },
               showInLegend: true,
            },
         },
         legend: {
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle',
         },
      };


      this.chartOptions4 = {
         title: {
            text: 'Likes, Dislikes and Comments over 12 Months' + ' of ' + new Date().getFullYear(),
         },
         xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         },
         yAxis: {
            title: {
               text: 'Count',
            },
         },
         legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
         },
         series: [
            {
               name: 'Likes',
               data: this.dataChartByMonth.map((item: any) => {
                  if(item[0] == null || item[0] === undefined || item[0] === ''){
                     return 0;
                  }
                  else {
                     
                  return item[0].totalLike;
                  }
               }),
            },
            {
               name: 'Dislikes',
               data: this.dataChartByMonth.map((item: any) => {
                  if(item[0] == null || item[0] === undefined || item[0] === ''){
                     return 0;
                  }
                  else {
                     
                  return item[0].totalDislike;
                  }
               }),
            },
            {
               name: 'Comments',
               data: this.dataChartByMonth.map((item: any) => {
                  if(item[0] == null || item[0] === undefined || item[0] === ''){
                     return 0;
                  }
                  else {
                     
                  return item[0].totalComment;
                  }
               }),
            },
         ],
      }


      this.chartOptions5 = {
         chart: {
            type: 'column'
         },
         title: {
            text: 'Engagement rated of all ideas by Events',
            align: 'left'
         },
         xAxis: {
            categories: res.data.dataEvent.map((item: any) => item.name),
         },
         yAxis: {
            min: 0,
            title: {
               text: 'Count trophies'
            },
            stackLabels: {
               enabled: true,
               style: {
                  fontWeight: 'bold',
                  color: ( // theme
                     Highcharts.defaultOptions.title!.style &&
                     Highcharts.defaultOptions.title!.style.color
                  ) || 'gray',
                  textOutline: 'none'
               }
            }
         },
         legend: {
            align: 'left',
            x: 70,
            verticalAlign: 'top',
            y: 70,
            floating: true,
            backgroundColor:
               Highcharts.defaultOptions.legend!.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
         },
         tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
         },
         plotOptions: {
            column: {
               stacking: 'normal',
               dataLabels: {
                  enabled: true
               }
            }
         },
         series: [{
            name: 'Likes',
            data: res.data.dataEvent.map((item: any) => item.totalLike),
         }, {
            name: 'Dislikes',
            data: res.data.dataEvent.map((item: any) => item.totalDislike),
         }, {
            name: 'Comments',
            data: res.data.dataEvent.map((item: any) => item.totalComment),
         },
         {
            name: 'Ideas',
            data: res.data.dataEvent.map((item: any) => item.totalIdea),
         }]
      }
      
         
      }, (err: any) => {
         this.toast.error({detail: "Get dashboard failed!", position: "top-right",duration: 3000});
         console.log(err);
      }
      )
   }


}