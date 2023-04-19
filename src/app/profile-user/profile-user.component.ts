import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {

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
