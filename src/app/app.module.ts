import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './result-page/error-page/error-page.component';
import { registerLocaleData, DatePipe, CommonModule } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { LoginGuard } from './guard/login.guard';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // 响应式表单
    BrowserAnimationsModule,
    NgZorroAntdModule,
    HttpClientModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, DatePipe, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
