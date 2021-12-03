import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isUser: boolean;
  constructor() {
    if (localStorage.getItem('currentUser')) {
      this.isUser = true;
    } else {
      this.isUser = false;
    }
  }

  ngOnInit(): void {}
}
