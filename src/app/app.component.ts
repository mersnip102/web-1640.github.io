import { AfterViewInit, Component } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  }
  title = 'web1640';
}
