import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  userName: String;
  userEmail: String;
  constructor(private router: Router, private authService: SocialAuthService){}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
  }

  home() {
    this.router.navigate(["/home/product"]);
  }

  addProduct() {
    this.router.navigate(["/home/addProduct"]);
  }

  addSize() {
    this.router.navigate(["/home/size"]);
  }

  addCategory() {
    this.router.navigate(["/home/category"]);
  }

  signOut(): void {
    this.authService.signOut().then((res: any) => {
      this.router.navigate(["/signIn"]);
      localStorage.clear();
    });
  }

}
