import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../api.service';

@Component({
  
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  status: any;
  constructor(
    
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, private toast: NgToastService) {

  } //dependency injection



  ngOnInit() {

    console.log(localStorage.getItem('token'))
    this.resetPasswordForm = this.fb.group({
      
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      
    });

    // this.newaccount();
    // this.newAccountForm.reset();

  }


   onSubmit() {
    
    const data = {
      oldPassword: this.resetPasswordForm.value.oldPassword,
      newPassword: this.resetPasswordForm.value.newPassword,
      confirmPassword: this.resetPasswordForm.value.confirmPassword,
    }

    
    
    this.api.changePassword( data
    ).subscribe(res => {

      // alert("Login Successful!");
        var data = JSON.parse(res)

        console.log(res);
        console.log(data.data.username);

        if (data.status == 200) {
          

          this.toast.success({detail: "Change Password Successful!", duration: 3000});
          this.router.navigate(['/resetpassword'])
         
          
        
          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          this.toast.error({detail: "Change Password Failed!", duration: 3000});
          this.router.navigate(['/resetpassword'])
        } 
        // else if (user.role == 4) {
        //   this.router.navigateByUrl('/staff');
        // }
        

      



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        this.toast.error({detail: "Change Password Failed!", duration: 3000});
        this.router.navigate(['/resetpassword'])
        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


  }

}
