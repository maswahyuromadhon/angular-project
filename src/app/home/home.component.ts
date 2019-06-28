import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {ConfirmationService, Header} from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  realized: any;
  details: any;
  realizedForm:  FormGroup;
  msgs: Message[] = [];
  // private url = 'http://192.168.43.223:8080/transaction/header/onprogress/';
  // private url1 = 'http://192.168.43.223:8080/transaction/detail/pending/';
  // private urlresolve = 'http://192.168.43.223:8080/transaction/resolve/';
  // private urlrealized = 'http://192.168.43.223:8080/transaction/realization/';
  // private urldetail = 'http://192.168.43.223:8080/transaction/detail/id/';

  private url = 'http://localhost:8080/transaction/header/onprogress/';
  private url1 = 'http://localhost:8080/transaction/detail/pending/';
  private urlresolve = 'http://localhost:8080/transaction/resolve/';
  private urlrealized = 'http://localhost:8080/transaction/realization/';
  private urldetail = 'http://localhost:8080/transaction/detail/id/';
  options: RequestOptions;

  constructor(
    private http: Http,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) { 
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');

    this.options = new RequestOptions({ headers: headers });
  }

  methodDetail(id){
    this.realizedForm.patchValue({dtlTRxId: id})
  }

  editTask(){
    this.realizedForm = this.formBuilder.group({
      dtlTRxId: ['', Validators.required],
      dateRealized: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('realisasi', JSON.stringify(this.realizedForm.value))
    console.log(input);
    return input;
  }

  onEditPatch(data) { 
    this.http.patch(this.urlrealized, data) 
    .subscribe(res => {
      console.log(res.json());
      this.getData();
      
    })

    window.location.reload();
    // console.log(JSON.stringify(this.realizedForm.value));
    // // setTimeout(() => {
    // //   alert('done!');
    // // }, 1000);
    // this.realizedForm.reset();
  }

  
  getData(){
    this.http.get(this.url)
      .subscribe(response => {
        console.log(response.json());
        this.realized = response.json();
      })
   }

   getDetail(a){
    this.http.get(this.url1 + a)
    // console.log(a);
      .subscribe(response => {
        console.log(response.json());
        this.details = response.json();
      })
   }

   getResolve(a){
    console.log(a);
    this.http.get(this.urlresolve + a)
      .subscribe(response => {
      console.log(response.json());
      this.details = response.json();
      this.getData();
           
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Succes Bro!!', detail:'Data Berhasil Resolve'});
      })
   }

   getEditRealized(a){
    console.log(a);
    this.http.get(this.urlresolve + a)
      .subscribe(response => {
      console.log(response.json());
      this.details = response.json();
      this.getData();
           
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Succes Bro!!', detail:'Data Berhasil Resolve'});
      })
   }


   confirmResolve(companyId) {
    this.confirmationService.confirm({
        message: 'Do you want to Resolve this record?',
        header: 'Reslove Confirmation',
        icon: 'fa fa-refresh',
        accept: () => {
        this.getResolve(companyId);
        window.location.reload();
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
    }
   
   //-------------validasi active atau nggk----------
 active(data: any) {
  this.realized.forEach((item, index) => {
    item.active = false;
  });
  data.active = true;

  console.log(this.realized);
  
}
 //-------------------------------------------

 
  ngOnInit() {
    this.getData();
    this.editTask();
    
}

}
