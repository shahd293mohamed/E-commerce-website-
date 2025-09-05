import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup implements OnInit {
  signupForm: FormGroup =new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  msg: string = '';

  constructor(private fb: FormBuilder, private authService: Auth) {}

  ngOnInit(): void {
    // this.signupForm = ({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', Validators.required],
    //   address: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required]
    // }, { validator: this.passwordMatchValidator });
    console.log("kelms");
    
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.msg = "Please fill all required fields correctly.";
      return;
    }

    const { name, email, phone, address, password } = this.signupForm.value;

    this.authService.signup({ name, email, phone, addresses: [address], password })
      .subscribe({
        next: (res) => {
          this.msg = "Account created successfully ✅";
          console.log(res);
        },
        error: (err) => {
          this.msg = "Error creating account ❌";
          console.error(err);
        }
      });
  }
}

