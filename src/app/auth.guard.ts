import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if (this.apiService.isLoggedIn()) {
      //   return true;
      // }
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      // return false;

    //   const allowedRoles = route.data.allowedRoles;
    // const userRole = this.authService.getUserRole();
    // if (allowedRoles.indexOf(userRole) === -1) {
    //   this.router.navigate(['/forbidden']);
    //   return false;
    // }
    // return true;
      console.log('vao day');
    const user = this.apiService.getUserRole();

    // Nếu người dùng chưa đăng nhập hoặc không có vai trò, chuyển hướng đến trang đăng nhập
    if (user == null || user == '' || user == undefined) {
      console.log('xdgvfdgvfdgd');
      console.log(route.data['allowedRoles'][0]);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    
    // Nếu người dùng có vai trò phù hợp, cho phép truy cập
    if (route.data['allowedRoles'][0] == user) {
      console.log('true');
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
   
      return false;
    
  }
  
}
