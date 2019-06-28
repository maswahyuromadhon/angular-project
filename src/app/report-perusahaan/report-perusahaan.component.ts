import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TreeNode, Message } from 'primeng/primeng';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-perusahaan',
  templateUrl: './report-perusahaan.component.html',
  styleUrls: ['./report-perusahaan.component.css']
})
export class ReportPerusahaanComponent implements OnInit {
  reports: TreeNode[];
  msgs: Message[];
  filterForm: FormGroup;

  // private url = 'http://localhost:8080/report/getreport/ / / /';
  

  constructor(
    private formBuilder: FormBuilder,
    private http: Http
  ) { }
  
  createForm(){
    this.filterForm = this.formBuilder.group({
      yearMonth: ['', Validators.required]
    });
  }

  onSubmit() {
    let json = this.filterForm.get('yearMonth').value;
    console.log('json',this.filterForm.value);
    
    this.http.get('http://localhost:8080/report/getreport/'+json+'/ / /')
    .subscribe(
      res =>{
      console.log('res',res.json());
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'Success Bro!!', detail:'Data Berhasil Ditambahkan'});
      // this.getAccount();
      this.reports = res.json();
      })
      
      // window.location.reload();         
  }


  getReport(){
    this.http.get('http://localhost:8080/report/getreport/2019-JUNI/ / /')
      .subscribe(response => {
        console.log(response.json());
        this.reports = response.json();
      })
   }

  ngOnInit() {
    // this.getReport();
    this.createForm();
    // var acc = document.getElementsByClassName("accordion");
    // var i;
    
    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var panel = this.nextElementSibling;
    //     if (panel.style.display === "block") {
    //       panel.style.display = "none";
    //     } else {
    //       panel.style.display = "block";
    //     }
    //   });
    // }
  }

}
