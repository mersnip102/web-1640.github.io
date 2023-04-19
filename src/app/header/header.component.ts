import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  durationInSeconds = 5;
  user!: any;
  

  status: any;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router, private toast: NgToastService) { } //dependency injection
  ngOnInit(): void {
    
    this.getUserById();
   }

   getUserById() {
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    this.api.getUserById(data.id).subscribe((res: any) => {
      this.user = res.data;
    })

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


  logout(){
    // this.api.logout().subscribe(res => {
    
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/login']);
    // } )


  }

}
