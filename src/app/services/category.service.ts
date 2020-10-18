import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  newCategory: any;
  updateCategoryParams: any;
  deleteCategoryParams: any;
  constructor(private httpClient: HttpClient) { }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  getAllCategories() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.get(
      "http://localhost:8081/category/viewCategory",
      {
        headers: headers,
      }
    );
  }

  addNewCategory(newCategory) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/category/addCategory",
      newCategory,
      { headers: headers }
    );
  }

  updateCategory(updateCategoryParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/category/updateCategory",
      updateCategoryParams,
      {
        headers: headers,
      }
    );
  }

  deleteCategory(deleteCategoryParams){
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/category/deleteCategory",
      deleteCategoryParams,
      {
        headers: headers,
      }
    );
  }
}
