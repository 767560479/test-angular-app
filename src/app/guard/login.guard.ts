import { UserService } from './../services/user/user.service';
import {
  CanActivate,  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  Injectable
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private route: Router
    ) {}

  canActivate(): Observable < boolean > | Promise < boolean > | boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }


  /**
   * 校验是否登陆
   */
  checkLogin(): Observable < boolean > | Promise < boolean > | boolean {
      if (this.userService.isLoggedIn()) {
          return true;
      }
    //   if (!environment.production) { // 本地环境
    //   }
      // return new Observable<boolean>((observer) => { // 返回一个异步请求
      //   // 单点
      // });

  }


}
