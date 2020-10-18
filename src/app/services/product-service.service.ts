import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  newProduct: any;
  updateProductParams: any;
  deleteProductParams: any;
  constructor(private httpClient: HttpClient) { }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  getAllProducts() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.get(
      "http://localhost:8081/product/viewProduct",
      {
        headers: headers,
      }
    );
  }

  addNewProduct(newProduct) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/product/addProduct",
      newProduct,
      { headers: headers }
    );
  }

  updateProduct(updateProductParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/product/updateProduct",
      updateProductParams,
      {
        headers: headers,
      }
    );
  }

  deleteProduct(deleteProductParams){
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/product/deleteProduct",
      deleteProductParams,
      {
        headers: headers,
      }
    );
  }
}
