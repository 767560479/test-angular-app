import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeMenuListComponent } from './home-menu-list/home-menu-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  @ViewChild('menuList') menuList: HomeMenuListComponent;
  constructor() { }

  ngOnInit() {
  }


  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

/**
 * 菜单侧边收起
 */
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    this.menuList.isCollapsed = this.isCollapsed;
  }
}
