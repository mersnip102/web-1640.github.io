import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';
//import file saver
import { saveAs } from 'file-saver';

@Component( {

  templateUrl: './document-download.component.html',
  styleUrls: [ './document-download.component.css' ]
} )


export class DocumentDownloadComponent implements OnInit
{
  durationInSeconds = 5;
  

  litsDocument: any[] = [];


  dowloadCSV(id: any): void {
    
    this.api.downloadCSV(id).subscribe((res: any) => {
      console.log(res);
      saveAs(res, 'document.csv');
      this.toast.success({ detail: "Download Successful!", position: "top-right", duration: 3000 })
    }, error => {
      console.log(error);
      this.toast.error({ detail: "Download Failed!", position: "top-right", duration: 3000 })
    })
  }

  

  status: any;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router, private toast: NgToastService) { } //dependency injection
  ngOnInit(): void {
    this.listDocument()
   }

  // showSuccess() { // in ra thàh công
  //   this.toastr.success('Thành công', 'Thông báo', {
  //     timeOut: 2000,
  //     progressBar: true,
  //     progressAnimation: 'increasing',
  //     closeButton: true,
  //     positionClass: 'toast-top-right'
  //   });
  // }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(9), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  listDocument(): void {
    this.api.getListDocument().subscribe((res: any) => {
      console.log(res.data.list);

      this.litsDocument = res.data;
    }
    )

  }

  
  
  onSubmit(data: any) {

    this.api.login(
      data.email,
      data.password
    ).subscribe(res => {
      // confirm("Đăng nhập thành công");
      
      
      localStorage.setItem('accessToken', res.accessToken);
      console.log(res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      console.log(res.message);
      // this._snackBar.openFromComponent(SnackBarComponent, {
      //   duration: this.durationInSeconds * 1000,
      // });
      
      
      if (res.status != 200) {
        
        // alert("Email or password is incorrect! Please try again!")

        this.toast.error({detail: "Email or password is incorrect! Please try again!", position: "top-right", duration:5000})
        this.loginForm.reset();
        this.router.navigate(['/login']);
      } else if (res.status == 200){
        // alert("Login Successful!");
        // this.snackBar.open('Đăng nhập thành công', 'Đóng', { duration: 2000 });
        

       
        const helper = new JwtHelperService();
        const user = helper.decodeToken(res.accessToken);

        console.log(user);

        if (user.role == 1) {
          this.router.navigateByUrl('/admin').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();

            
            // Reload the current page
            // window.location.reload();
          });
          // this.router.navigate(['/admin'])
        } else if (user.role == 2) {
          this.router.navigateByUrl('/qam').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();

            
            // Reload the current page
            // window.location.reload();
          });
        } 
        else if (user.role == 4) {
          
         

          this.router.navigateByUrl('/staff').then(() => {
            this.toast.success({detail: "Login Successful!", position: "top-right", duration:3000})
        this.loginForm.reset();

            
            // Reload the current page
            // window.location.reload();
          });
        }
        

      }



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        
        this.toast.error({detail: "Email or password is incorrect! Please try again!", position: "top-right", duration:5000})
        // alert("Email or password is incorrect! Please try again")
        
        this.router.navigate(['/login']);
      }

    );

  }

  dowloadZIP() {
    this.api.dowloadFileZip().subscribe(res => {
      saveAs(res, 'example.zip');

      this.toast.success({ detail: "Download Successful!", position: "top-right", duration: 3000 })
    }, error => {
      console.log(error);
      this.toast.error({ detail: "Download Failed!", position: "top-right", duration: 3000 })
    });
  
  }

}

