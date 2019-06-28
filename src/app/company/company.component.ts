import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Message } from 'primeng/primeng';
// import { CompaniesService } from './companies.service';
import {ConfirmationService} from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
// import { DomSanitizer } from '@angular/platform-browser';
// import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  gets: any;
  msgs: Message[] = [];
  selectedFile: File = null;
  companyId: any;
  gambar: any;
  
  // private url = 'http://192.168.43.223:8080/company/';
  // private urlFindId = 'http://192.168.43.223:8080/company/id/';
  // private url2 = 'http://192.168.43.223:8080/company/add/';

  private url = 'http://localhost:8080/company/';
  private urlFindId = 'http://localhost:8080/company/id/';
  private url2 = 'http://localhost:8080/company/add/';
  constructor(
    private http: Http,
    // private companiesService: CompaniesService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private lastUri: ActivatedRoute,
    // private sanitizer: DomSanitizer
    ) {
      // this.lastUri.params.subscribe(param => this.companyId = param.id)
   }

   showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Success Bro!!', detail:'Data Berhasil Ditambahkan'});
  }

   getData(){
    this.http.get(this.url)
      .subscribe(response => {
        console.log(response.json());
        this.gets = response.json();
      })
   }

   loadData(id){
     this.http.get(this.urlFindId + id)
     .subscribe(res => {
       console.log(res.json());
       this.gets = res.json();
       this.companyForm.patchValue(this.gets);
     })
   }

   updateData(){
     let data = this.companyForm.value;
     this.http.put(this.url, data)
     .subscribe(res => {
       console.log(res.json());
       this.gets = res.json();
     })
   }

   createForm(){
    this.companyForm = this.formBuilder.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyLogo: ['', Validators.required]
    });
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
    
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('company', JSON.stringify(this.companyForm.value))
    input.append('file', this.selectedFile, this.selectedFile.name);
    console.log(input);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    let json = formModel;
    this.http.post(this.url2, json)
    .subscribe(res => {
    console.log(res);
    this.getData();
    },
    err => {
      console.log(err);
      this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Code Already Exist'});
    }
    )
    console.log(JSON.stringify(this.companyForm.value));
    // setTimeout(() => {
    //   alert('done!');
    // }, 1000);
    this.companyForm.reset();
  }

  back(){
    this.companyForm.reset();
  }

  onLoadDataClick(id) : void {
    this.http.get(this.url + id)
    .subscribe(res => {
      console.log(res);
      this.gets = res.json();
      this.companyForm.setValue(this.gets);
      })
  }

   deleteData(companyId){
      this.http.delete(this.url + companyId)
      .subscribe(res => {
        console.log(res);
       this.msgs = [];
       this.msgs.push({severity:'error', summary:'Succes Bro!!', detail:'Data Berhasil Dihapus'});
       this.getData();      
      },
      error => {
        console.log(error)
      })
   }

   confirm2(companyId) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.deleteData(companyId);
        },
        reject: () => {
            this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
    });
    }

   active(data: any) {
     this.gets.forEach((item, index) => {
       item.active = false;
     });
     data.active = true;

     this.createForm();
   }

  ngOnInit() {
    this.getData();
    this.createForm();
    // --------------------------- 
  }
}
