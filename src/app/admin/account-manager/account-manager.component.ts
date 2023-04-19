import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { ApiService } from 'src/app/api.service';
import { SuccessDialogComponentComponent } from '../create-account/success-dialog-component/success-dialog-component.component';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgToastService } from 'ng-angular-popup';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2'

interface User {
  avatar: string;
  department: any;
  email: string;
  firstName: string;
  userId: number;
  lastName: string;
  password: string;
  role: string;
  username: string;

}
@Component({

  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})


export class AccountManagerComponent implements OnInit {


  users: User[] = []; // List of users
  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;


  pagedStudents: User[] = []; // List of users for current page
  totalItems?: number; // Total number of users

  page?: number;

  accounts?: any[];

  createAccountForm!: FormGroup;

  constructor(private api: ApiService, private router: Router, private location: Location,
    private route: ActivatedRoute, private http: HttpClient,
    private dialog: MatDialog, private fb: FormBuilder, private toast: NgToastService, private modalService: NgbModal) { }

  ngDepartment: any[] = []
  ngOptionrole = ["Admin", "QMA", "ABC", "Staff"];
  public aElement?: boolean = true;


  onclick() {
    this.aElement = !this.aElement;


  }
  currentFile?: File;

  selectFile(event: any, fieldName: string): void {

    this.currentFile = event.target.files[0];
    this.createAccountForm.get('avatar')?.setValue(this.currentFile);




  }

  user: User = {
    avatar: '',
    department: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    userId: 0,
    role: '',
    username: '',
  }

  getAnUser(id: number) {
    console.log(id);
    this.api.getUsers().subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      if (data.status == 200) {
        //filter user by id

        let user = data.data.listUser.filter((user: any) => user.userId == id)[0];
        console.log(user);
        //set value for formcontrol
        console.log(this.editAccountForm.value);
        for (let key in this.editAccountForm.value) {
          if (key == "avatar") continue;
          this.editAccountForm.get(key)?.setValue(user[key]);
        }

        console.log(this.editAccountForm.value);

      } else {
        alert("Get user failed!");
        console.log(data.message);
        return
      }

    }, error => {
      alert("Get user error!");
      console.log(error);
      return
    }
    )

  }


  editUser(id: any) {
    if (confirm("Are you sure to edit this account?")) {
      console.log(this.editAccountForm.get('userId')?.value);

      var formData: any = new FormData();
      for (let key in this.editAccountForm.value) {
        console.log(key);
        formData.append(key, this.editAccountForm.get(key)!.value);
      }
      console.log(formData);

      this.api.editUser(id, formData
      ).subscribe(async (res: any) => {
        var data = JSON.parse(res);

        if (data.status == 200) {

          // Reload current page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/accountmanager']).then(() => {
              this.modalService.dismissAll();
              Swal.fire("Account edited successfully!", "", "success");
              // this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })


            })
          })


          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          this.toast.warning({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
          alert("Edit Account Failed!")

        }

      },

        error => {
          this.toast.error({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
          console.log(error)

        });


    }




  }

  async loadStudents(): Promise<void> {
    await this.loadListDepartment();
    this.api.getUsers(this.currentPage, this.limit).subscribe(
      res => {
        console.log(res);
        console.log(this.ngDepartment);
        var users = JSON.parse(res);
        
        this.users = users.data.listUser;
        //change avater url
        this.users.forEach((user: any) => {
          //change localhost to ip
          user.avatar = user.avatar.replace("localhost:8888", "139.162.47.239");
        })
        console.log(users);
        this.totalPages = Math.ceil(users.data.totalUser / this.limit);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)
      },
      error => {
        console.log(error);
      }
    );
  }

  changePage(i: number): void {
    // const element = document.getElementById('paginator');
    // element!.classList.add('active');


    this.currentPage = i
    this.loadStudents();
  }


  nextPage() {
    this.currentPage++;
    this.loadStudents();
  }

  previousPage() {
    this.currentPage--;
    this.loadStudents();
  }

  checkRole(id: any): any {
    if (id == 1) {
      return "Admin";
    } else if (id == 2) {
      return "QAM";
    } else if (id == 3) {
      return "QAC";
    } else if (id == 4) {
      return "Staff";
    }
  }

  checkDepartment(id: any): any {
    
    //return name department or ""
    this.ngDepartment.forEach((department: any) => {
      if (department.id == id) {
        return department.name;
      }
      else {
        return "";
      }
    })
   
  }

  loadListDepartment(): any {
    this.api.getDepartment().subscribe((res: any) => {
      console.log(res);
      this.ngDepartment = res.data.list;
    }, error => {
      console.log(error);
    })
  }




  async ngOnInit() {
    this.createAccountForm = this.fb.group({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      role: null,
      department: null,
      avatar: null
    })
    await this.loadListDepartment()
    await this.loadStudents()

    console.log(this.ngDepartment);
    

    

    // this.route.queryParams.subscribe(params => {
    //   this.page = +params['page'] || 1;
    //   this.limit = +params['limit'] || 5;
    //   //Lấy danh sách tài khoản từ API
    //   this.api.getUsers(this.page, this.limit).subscribe((data: any) => {
    //     console.log(data)
    //     var d = JSON.parse(data);
    //     this.accounts = d.data.listUser;

    //     console.log()
    //   },
    //   error => {
    //     console.log(error);
    //   }

    //   );
    // });

  }


  editAccountForm = new FormGroup({
    userId: new FormControl(0),
    avatar: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),

    role: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required])
  })

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe((data: any) => {
          this.toast.success({ detail: "Delete Account Success!", duration: 3000, position: "top-right" })
          this.loadStudents();
        },

          error => {
            Swal.fire(
              'Failed!',
              'Delete failed.',
              'error'
            )
          }
        )
      }
    })
  }

    // if (confirm("Are you sure you want to delete this account?")) {
    //   this.api.deleteUser(id).subscribe((data: any) => {
    //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //       this.router.navigate(['/admin/accountmanager']).then(() => {
    //         this.modalService.dismissAll();
    //         this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })
    //       })
    //     })



    //   },
    //     error => {
    //       alert("Delete Failed!")
    //     }

    //   );
    // }

  // }




  EditAccountForm(data: any) {
    //get password from localstorage
    var formData: any = new FormData();

    formData.append('firstName', this.editAccountForm.get('firstName')!.value?.toString());
    formData.append('lastName', this.editAccountForm.get('lastName')!.value);
    formData.append('username', this.editAccountForm.get('username')!.value);
    formData.append('email', this.editAccountForm.get('email')!.value);
    formData.append('role', this.editAccountForm.get('role')!.value);
    formData.append('password', this.editAccountForm.get('password')!.value);
    formData.append('department', this.editAccountForm.get('department')!.value);

    this.api.createNewAccount(formData
    ).subscribe(res => {

      // alert("Login Successful!");
      var data = JSON.parse(res)

      console.log(res);
      console.log(data.data.username);

      if (data.status == 200) {


        const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
          data: {
            username: data.data.username,
            email: data.data.email,
            password: this.editAccountForm?.get('password')?.value,
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          // Xử lý sau khi dialog đóng lại (nếu cần)
        });
        this.editAccountForm.reset();

        this.router.navigate(['/admin/'])

        // this.router.navigate(['/admin'])
      } else if (data.status == 400) {
        alert("Edit Account Failed!")
      }

    },

      error => {
        alert("Edit Account Failed!")

        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


  }











}
