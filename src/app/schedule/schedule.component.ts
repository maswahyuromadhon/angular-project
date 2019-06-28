import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ScheduleService } from './schedule.service';
import { Observable } from 'rxjs/Observable';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  details: any;
  detailsss: any;
  tasks: any;
  checked1: boolean;

  // private url = 'http://192.168.43.223:8080/defaultsch/all/';
  // private urlGantiSchedule = 'http://192.168.43.223:8080/defaultsch/';
  // private url1 = 'http://192.168.43.223:8080/schedule/task/' ;
  // private url2 = 'http://192.168.43.223:8080/schedule/company/';
  // private urlFindId = 'http://192.168.43.223:8080/schedule/id/';
  // private urlGetDefaultSch = 'http://192.168.43.223:8080/defaultsch/companyId';

  private url = 'http://localhost:8080/defaultsch/all/';
  private urlGantiSchedule = 'http://localhost:8080/defaultsch/';
  private url1 = 'http://localhost:8080/schedule/task/' ;
  private url2 = 'http://localhost:8080/schedule/company/';
  private urlFindId = 'http://localhost:8080/schedule/id/';
  private urlGetDefaultSch = 'http://localhost:8080/defaultsch/companyId';


  constructor(
    private http: Http
    // private service: ScheduleService
    ) {
    // http.get(this.url)
    // .subscribe(response => {
    //   console.log(response.json());
    //   this.posts = response.json();
    // });
   }

   getData(){
    this.http.get(this.url)
      .subscribe(response => {
        console.log(response.json());
        this.details = response.json();
      })

   }

   getDefaultSch(id){
     this.http.get(this.urlGetDefaultSch + id)
     .subscribe(res => {
       console.log(res.json());
       this.details = res.json();
     })
   }

   getCompanyId(id){
     let stat: any;
     this.http.get(this.urlFindId + id)
     .subscribe(res => {
       console.log(res.json());
     })

     this.http.patch(this.urlGantiSchedule, stat + JSON.stringify(stat))
      .subscribe(response => {
        console.log(response.json());
        this.details = response.json();
      })
   }

   gantiSchedule(stat){
     let aa = this.getCompanyId;
     console.log(aa);
     
    // this.http.patch(this.urlGantiSchedule, stat + JSON.stringify(aa))
    //   .subscribe(response => {
    //     console.log(response.json());
    //     this.details = response.json();
    //   })
   }

   getDetail(a){
    console.log(a);
    this.http.get(this.url2 + a)
      .subscribe(response => {
        console.log(response.json());
        this.detailsss = response.json();
      })
   }

   getTask(b){
    console.log(b);
    this.http.get(this.url1 + b)
      .subscribe(response => {
        console.log(response.json());
        this.tasks = response.json();
      })
   }

  // getDetail(detail: any){
    //  console.log(post)
    //  const a = this.url + /posts/ + post;
    //  console.log(a);
    //  let b = {
    //    headers: new http({'Content-Type' : 'application/json'})
    //  }

    //  console.log(b);
     
     
  //    return this.http.delete(this.url + /details/, detail);
  //  }

  // createPost(input: HTMLInputElement){
  //   let post = { title: input.value };
  //   input.value = '';

  //   this.http.post(this.url, JSON.stringify(post))
  //   .subscribe(response => {
  //     post['id'] = response.json().id;
  //     this.posts.splice(0, 0, post);
  //   });
  // }

  //-----tambah task di modal-----------
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }
 //----------------------------------------

 //-------------validasi active atau nggk----------
//  active(data: any) {
//   this.gets.forEach((item, index) => {
//     item.active = false;
//   });
//   data.active = true;

//   console.log(this.gets);
  
// }
 //-------------------------------------------

 active(data: any) {
  this.details.forEach((item, index) => {
    item.active = false;
  });
  data.active = true;

  console.log(this.details);
  
}
  ngOnInit() {
    this.getData();
  }

}
