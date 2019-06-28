import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CompaniesService {
  private url = 'http://192.168.43.169:8080/company/';
  public status: BehaviorSubject<boolean> = new BehaviorSubject <boolean>(false);

  constructor(
    private http: HttpClient
  ) { }


  display(value: boolean){
    this.status.next(value);
  }

  getDataaa(){
    return this.http.get(this.url);
   }


  // header() {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
    
  //   return headers;
  // }

  // addData(data: any) {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   return this.http.post(this.url + 'gets/', data, {headers: headers});
  // }


  // getData() {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   return this.http.get(this.url, {headers: headers});
  // }

  // deleteData(companyId) {
  //   return this.http.delete(this.url + companyId).map
  //   (res => {
  //     return res.json()
  //   })
  // }

}
