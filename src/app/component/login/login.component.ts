import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup; // 登陆表单
  userName; // 登陆用户名
  password = 'gs.500'; // 登录密码
  userDisplayName; // Cookie用户名
  loginButtonText = '登录';  // 登录按钮赋值
  effectiveUser = '10059333';

  constructor(
    private fb: FormBuilder, // 表单
    private router: Router, // 路由
  ) { }

  ngOnInit() {
    // 表单
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    // 表单
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  // 登录
  autoLogin() {
    this.login();
  }

  login() {
    // -----
  }


  mouseEnter() {
    document.getElementById('submittedAction').style.transition = '0.3s';
    document.getElementById('submittedAction').style.backgroundColor = '#40A9F3';
  }

  mouseLeave() {
    document.getElementById('submittedAction').style.transition = '0.3s';
    document.getElementById('submittedAction').style.backgroundColor = '#1E90FF';
  }

}