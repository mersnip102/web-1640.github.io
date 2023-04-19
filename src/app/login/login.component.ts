import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


interface LoginDetails {
  email: string | null,
  password: string | null,
}
@Component({

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  durationInSeconds = 5;

  status: any;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router, private toastr: ToastrService, private toast: NgToastService, private _snackBar: MatSnackBar) { } //dependency injection
  ngOnInit(): void {
    
   }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(9), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  
  onSubmit(data: any) {

    this.api.login(
      data.email,
      data.password
    ).subscribe(res => {
      
      localStorage.setItem('accessToken', res.accessToken);
      console.log(res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      console.log(res.message);
      
      if (res.status != 200) {

        this.toast.error({detail: "Email or password is incorrect! Please try again!", position: "top-right", duration:5000})
        this.loginForm.reset();
        this.router.navigate(['/login']);
      } else if (res.status == 200){
        const helper = new JwtHelperService();
        const user = helper.decodeToken(res.accessToken);
        console.log(user);

        if (user.role == 1) {
          this.router.navigateByUrl('/admin').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();

          });
          
        } else if (user.role == 2) {
          this.router.navigateByUrl('/qam').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();
          });
        } 

        else if (user.role == 3) {
          this.router.navigateByUrl('/qac').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();
          });
        } 
        else if (user.role == 4) {

          this.router.navigateByUrl('/staff').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();
          });
        }
        

      }

    },

      error => {
        
        this.toast.error({detail: "Email or password is incorrect! Please try again!", position: "top-right", duration:5000})
        
        this.router.navigate(['/login']);
      }

    );

  }

}
