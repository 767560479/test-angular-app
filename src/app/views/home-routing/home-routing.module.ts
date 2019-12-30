import { HomeComponent } from './../home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [],
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   // RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
