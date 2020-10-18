import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser, GoogleLoginProvider } from "angularx-social-login";

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private userService: UserService, private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      localStorage.setItem('userName', this.user.name);
      localStorage.setItem('userEmail', this.user.email);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) =>{
      this.userService.signIn(this.user.name, this.user.email).subscribe((data: any) => {
        if(data.result === 1){
          localStorage.setItem('token', data.token);
          this.router.navigate(["/home/product"]);
        }
      });
    });
  }

}
