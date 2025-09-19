import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<any>('https://dummyjson.com/auth/login', this.loginForm.value).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.accessToken);
          this.toast.success('Login successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
          this.toast.error('Login failed!', error?.message);
        },
      });
    }
  }
  onReset() {
    this.loginForm.reset();
  }
}
