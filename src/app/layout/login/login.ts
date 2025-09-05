import { Component, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { Ilogin } from '../../core/model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  constructor(private _auth:Auth, private _router:Router) { }
  ngOnInit(): void {
      this._auth.initAuth();
    
  }

  loginForm : FormGroup = new FormGroup({
    email : new FormControl<string|null>('',[Validators.required,Validators.email]),
    password : new FormControl<string|null>('',[Validators.required]),
  })
  msg = '';
  submit(){
    const Value = this.loginForm.value as Ilogin;
     this._auth.login(Value).subscribe({
    next: res => {
      this.msg = "✅ Logged in successfully!";
      console.log("Login Success:", res);}
    ,
    error: err => {
      this.msg = "❌ email or password is incorrect";
      console.error("Login Failed:", err);
    }
    
  })
  console.log(Value);
  
  }


}
