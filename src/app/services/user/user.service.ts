import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public userName: string;
  public userCode: string;

  isLoggedIn(): boolean {
    return this.userName  !== undefined;
  }
}
