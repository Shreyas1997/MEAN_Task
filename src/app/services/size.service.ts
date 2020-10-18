import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  newSize: any;
  updateSizeParams: any;
  deleteSizeParams: any;
  constructor(private httpClient: HttpClient) { }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  getAllSizes() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.get(
      "http://localhost:8081/size/viewSize",
      {
        headers: headers,
      }
    );
  }

  addNewSize(newSize) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/size/addSize",
      newSize,
      { headers: headers }
    );
  }

  updateSize(updateSizeParams) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/size/updateSize",
      updateSizeParams,
      {
        headers: headers,
      }
    );
  }

  deleteSize(deleteSizeParams){
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.httpClient.post(
      "http://localhost:8081/size/deleteSize",
      deleteSizeParams,
      {
        headers: headers,
      }
    );
  }
}
