import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  tokenExist(){
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signIn(userName: String, userEmail: String) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/user/auth",
      {
        userName, userEmail
      },
      {
        headers: headers,
      }
    );
  }
}
