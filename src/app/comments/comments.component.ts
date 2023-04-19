import { Component, AfterViewInit, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component( {
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: [ './comments.component.css' ]
} )
export class CommentsComponent implements AfterViewInit, OnInit
{
  ngOnInit (): void
  {

  }
  constructor () { }
  ngAfterViewInit (): void
  {
    const socialListScrollbar = new PerfectScrollbar( '.dashboard-social-list' );
    const topCountriesScrollbar = new PerfectScrollbar( '.dashboard-top-countries' );
  }
}
