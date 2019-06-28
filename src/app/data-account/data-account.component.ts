import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Message } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ConfirmationService} from 'primeng/primeng';
// import { EventService } from './event.service';

@Component({
  selector: 'app-data-account',
  templateUrl: './data-account.component.html',
  styleUrls: ['./data-account.component.css']
})
export class DataAccountComponent implements OnInit {
  posts: any[];
  msgs: Message[] = [];
  events: any[];
  header: any;
  accountForm: FormGroup;

  // dtOptions: DataTables.Settings = {};

  // private url = 'http://localhost:8080/jenis';
  // private url = 'http://192.168.43.169:8080/useraccount/';
  private url = 'http://localhost:8080/useraccount/';
  // private url = 'http://localhost:8080/useraccount/';


  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
    // private eventService: EventService,
    // private https: HttpClient
    ) {
    
   }

      
   createForm(){
    this.accountForm = this.formBuilder.group({
      userId: ['uuid', Validators.required],
      userCode: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      userRole: ['', Validators.required]
    });
  }

  onSubmit() {
    let json = this.accountForm.value;
    console.log('json',this.accountForm.value);
    
    this.http.post(this.url, json)
    .subscribe(
      res =>{
      console.log('res',res);
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'Success Bro!!', detail:'Data Berhasil Ditambahkan'});
      this.getAccount();
      })
      
      // window.location.reload();         
  }

   getAccount(){
    this.http.get(this.url)
    .subscribe(response => {
      console.log(response.json());
      this.posts = response.json();
    });
   }

   back(){
    this.accountForm.reset();
    }

   deleteData(userId){
      this.http.delete(this.url + userId)
      .subscribe(res => {
        console.log(res);
        this.getAccount();
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Bro!!', detail:'Data Berhasil Dihapus'});
      },
      error => {
        console.log(error)
      })
   }

   active(data: any) {
     this.posts.forEach((item, index) => {
       item.active = false;
     });
     data.active = true;

     console.log(this.posts);

     
   }

   confirm2(userId) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.deleteData(userId);
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'Silahkan Coba Lagi.'}];
        }
    });
}

  

  ngOnInit() {
    this.getAccount();
    this.createForm();

    // this.dtOptions = {
    //   pagingType: 'full_numbers'
    // };
   
  }


}
