import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http } from '@angular/http';
import {Router} from "@angular/router"
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private url = 'http://localhost:8080/login/';
  // private url = 'http://localhost:8080/login/';
  msgs: Message[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router
  ) { }

  createForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('company', this.loginForm.value)
    console.log(input);
    return input;
  }


  onLogin(form){
    const formModel = this.prepareSave();
    let json = formModel;
    this.http.post(this.url, form)
    .subscribe(res => {
    console.log(res.json());
    this.router.navigate(['/dataaccount'])  
    },
    err => {
      console.log(err);
      this.msgs = [];
       this.msgs.push({severity:'error', summary:'ERROR', detail:'Email dan Password salah !!!'});
    })
    console.log(JSON.stringify(this.loginForm.value));
  }

  ngOnInit() {
    this.createForm();
  }

}
