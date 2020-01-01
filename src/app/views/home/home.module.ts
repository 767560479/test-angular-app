import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from '../home-routing/home-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeMenuListComponent } from './home-menu-list/home-menu-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeCenterComponent } from './home-center/home-center.component';

@NgModule({
  declarations: [HomeComponent, HomeMenuListComponent, HomeCenterComponent],
  imports: [
    NgZorroAntdModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
