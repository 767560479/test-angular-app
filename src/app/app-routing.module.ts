import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './result-page/error-page/error-page.component';
import { LoginComponent } from './component/login/login.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: 'home', loadChildren: './views/home/home.module#HomeModule', canActivate: [LoginGuard]},
  { path: 'page-error', component: ErrorPageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent},
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
