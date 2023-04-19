import { AfterViewInit, Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-qam',
  templateUrl: './qam.component.html',
  styleUrls: ['./qam.component.css']
})
export class QamComponent implements  AfterViewInit, OnInit {
  ngOnInit (): void
  {

  }
  constructor (  ) { }


  ngAfterViewInit (): void
  {
    const socialListScrollbar = new PerfectScrollbar( '.dashboard-social-list' );
    const topCountriesScrollbar = new PerfectScrollbar( '.dashboard-top-countries' );
  }




}
