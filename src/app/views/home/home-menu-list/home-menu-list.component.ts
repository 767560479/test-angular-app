import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-menu-list',
  templateUrl: './home-menu-list.component.html',
  styleUrls: ['./home-menu-list.component.scss']
})
export class HomeMenuListComponent implements OnInit {
  isCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
