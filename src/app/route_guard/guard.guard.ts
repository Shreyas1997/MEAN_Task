import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private productService: UserService, private router: Router) { }
  canActivate(): boolean {
    if(this.productService.tokenExist()){
      return true;
    } else {
      this.router.navigate(["/signIn"]);
      return false;
    }
  }
  
}
