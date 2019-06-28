import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ScheduleService {
  private url = 'http://192.168.43.169:8080/schedule/';

  constructor(
    private http: HttpClient
  ) { }

  addData(data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.url + 'gets/', data, {headers: headers});
  }


  getData() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get(this.url, {headers: headers});
  }

  deleteData() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.delete(this.url, {headers: headers});
  }

}
