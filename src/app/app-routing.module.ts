import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './result-page/error-page/error-page.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
 // { path: 'home', loadChildren: './views/home/home.module#HomeModule' },
  { path: 'page-error', component: ErrorPageComponent },
  { path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
