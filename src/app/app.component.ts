import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
// import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RobinConnect';

  ngOnInit(): void {
      AOS.init();
  }
}
