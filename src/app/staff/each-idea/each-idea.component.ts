import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SuccessDialogComponentComponent } from 'src/app/admin/create-account/success-dialog-component/success-dialog-component.component';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';
import { EditIdeaComponent } from '../each-event/edit-idea/edit-idea.component';
import * as saveAs from 'file-saver';

@Component({
  selector: 'each-idea',
  templateUrl: './each-idea.component.html',
  styleUrls: ['./each-idea.component.css']
})
export class EachIdeaComponent implements OnInit {
  id!: any;
  @Output() ideaEvent = new EventEmitter<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private toast: NgToastService) {
      this.getIdea();

     


      
     
   
     }
     user!: any;
     getUserById() {
      const helper = new JwtHelperService();
      const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
      this.api.getUserById(data.id).subscribe((res: any) => {
        this.user = res.data;
      })
  
     }

     

    show(id: any) {
        this.ref = this.dialogService.open(EditIdeaComponent, {
            // header: 'Select a Product',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: {
              id: id
          },
        });

        this.ref.onClose.subscribe((product: any) => {
            // if (product) {
            //     this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
            // }
        });

        this.ref.onMaximize.subscribe((value: any) => {
            // this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
        });
    }

    

     receiveIdea($event:any) {
      
      console.log($event);
      this.getIdea();
      this.listComment();
    
      this.cdr.detectChanges();
    }


    receiveComment($event: any) {
      console.log($event);
      this.getIdea();
      this.listComment();
    this.getListIdea();
      this.cdr.detectChanges();
   
   
    
  }




     isLiked = false;
     isDisliked = false;

     like(id: any) {
      this.api.likeIdea(id).subscribe(async (res: any) => {
        console.log(res);
       
          
          this.getIdea();
          this.cdr.detectChanges(); // Thêm dòng này
          // this.cdr.markForCheck(); // Thêm dòng này
        
      }, error => {
        this.toast.error({ detail: "Like idea failed!" });
        console.log(error);
        return
      }
      )
  
  
    }
  
    dislike(id: any) {
      this.api.dislikeIdea(id).subscribe(async (res: any) => {
        console.log(res);
        if (res.status == 200) {
          
          this.getIdea();
          this.cdr.detectChanges(); // Thêm dòng này
        }
      }, error => {
        this.toast.error({ detail: "Like idea failed!" });
        console.log(error);
        return
      }
      )
    }

    checkUpdateDeleteOptions(id: any) {
      const helper = new JwtHelperService();
      const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
      console.log(data);
      if (id == data.id) {
        return true;
      }
      return false;
    }

    deleteIdea(id: number) {
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
          this.api.deleteIdea(id).subscribe((data: any) => {
            // Swal.fire(
            //   'Deleted!',
            //   'Your file has been deleted.',
            //   'success'
            // )
            this.toast.success({ detail: "Delete idea successfully!", duration: 3000, position: "top-right" })
            this.loadStudents();
          },
  
            error => {
              this.toast.error({ detail: "Delete idea failed!", duration: 3000, position: "top-right" })
              console.log(error)
            }
          )
        }
      })
    }
  
    deleteComment(id: number) {
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
          this.api.deleteComment(id).subscribe((data: any) => {
            // Swal.fire(
            //   'Deleted!',
            //   'Your file has been deleted.',
            //   'success'
            // )
            this.toast.success({ detail: "Delete comment successfully!", duration: 3000, position: "top-right" })
            this.loadStudents();
          },
  
            error => {
              this.toast.error({ detail: "Delete comment failed!", duration: 3000, position: "top-right" })
              console.log(error)
            }
          )
        }
      })
    }


    editingComment = false ;
  editingCommentText?: any //[(ngModel)]="editingCommentText"
  ananymous!: any
  editComment() {
    this.editingComment == true
  }

  cancelEdit() {
    this.editingComment = false;
    this.editingCommentText = '';
  }
  
  saveEditComment(id: any) {
    let data = {
      content: this.editingCommentText,
      anonymous: this.ananymous
    }
    this.api.editComment(id, data).subscribe((data: any) => {
      console.log(data);
      this.editingComment = false;
      this.editingCommentText = '';
      this.toast.success({ detail: "Edit comment success!", duration: 3000, position: "top-right" })
    }, error => {
      console.log(error);
      this.toast.error({ detail: "Edit comment failed!", duration: 3000, position: "top-right" })
    })

    
  }

    checkFileType(fileName: string): any {
      const imageExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;
      const pdfExtensions = /\.pdf$/i;
      const docxExtensions = /(\.docx|\.doc)$/i;
      const csvExtensions = /(\.csv|\.xls|\.xlsx)$/i;
      const pptExtensions = /\.ppt$/i;
    
      if (imageExtensions.test(fileName)) {
        return 'image'
      } else if (pdfExtensions.test(fileName)) {
        return 'pdf'
      } else if (docxExtensions.test(fileName)) {
        return 'docx'
      } else if (csvExtensions.test(fileName)) {
        return 'csv'
      } else if (pptExtensions.test(fileName)) {
        return 'ppt'
      } else {
       return null
      }
    }


    listComment() {
      this.api.getListComment(this.id).subscribe(async (res: any) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res.data);
          this.comments = res.data.listComment;
          // this.totalPages = res.totalPages;
          // this.pageArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
          this.cdr.detectChanges(); // Thêm dòng này
        }
      }, error => {
        this.toast.error({ detail: "Like idea failed!" });
        console.log(error);
        return
      }
      )
    }

  // products!: any[];

  //   selectProduct() {
        
  //   }

    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
    // }


    isImage(file: string): boolean {
      return /\.(jpe?g|png|gif)$/i.test(file);
    }
  
    // encodeURI(data: string): any {
    //   const data2 =encodeURIComponent(data)
    //   console.log(data);
    //   return data2
    // }
  
    dowload(link: any): any {
      // console.log(link);
      // const data: any = this.sanitizer.bypassSecurityTrustUrl(link);
      // //  const data =encodeURIComponent(link)
      // console.log(data);
      // return data
    }

  @Input() postId!: number;

  comments!: any[]
  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;
 
  totalItems?: number; // Total number of users

  page?: number;

  accounts?: any[];

  createAccountForm!: FormGroup;

  

  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
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

  idea: any
  allowComment: boolean = false;

  getIdea() {
    this.api.getIdeaById(this.id).subscribe((d: any) => {
   

    this.idea = d.data;
    for (let i = 0; i < this.idea.event.length; i++) {
      if (new Date(this.idea.listComment[i].deadlineComment)< new Date()) {
        this.allowComment = true;
        
      } else {
        this.allowComment = false;
      }
    }
    console.log(this.idea);

  })
}

downloadFile(fileName: any): void {
  this.api.downloadFile(fileName).subscribe(async (data) => {
    await saveAs(data, fileName);
    this.toast.success({ detail: "Download file successfully!" });
  }, error => {
    console.log(error);
    this.toast.error({ detail: "Download file failed!" });
  })
}

 

 
  // getAnUser() {
    
  //   const helper = new JwtHelperService();
  //   const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
  //   console.log(data);
    
  //   this.api.getUsers().subscribe((d: any) => {
  //     var data = JSON.parse(d);
  //     console.log(data);
  //     if (data.status == 200) {
  //       //filter user by id

  //       let user = data.data.listUser.filter((user: any) => user.userId == data.id)[0];
  //       console.log(user.avatar);
  //       //set value for formcontrol
        

  //     }

  //   }, error => {
  //     this.toast.error({ detail: "Get user failed!" });
  //     console.log(error);
  //     return
  //   }
  //   )

  // }


  getListIdea() {
    
    const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(user);
    // console.log(id);
    // this.api.getUsers().subscribe((d: any) => {
    //   var data = JSON.parse(d);
    //   console.log(data);
    //   if (data.status == 200) {
    //     //filter user by id

    //     let user = data.data.listUser.filter((user: any) => user.userId == id)[0];
    //     console.log(user);
    //     //set value for formcontrol
    //     console.log(this.editAccountForm.value);
    //     for (let key in this.editAccountForm.value) {
    //       if (key == "avatar") continue;
    //       this.editAccountForm.get(key)?.setValue(user[key]);
    //     }

    //     console.log(this.editAccountForm.value);

    //   } else {
    //     alert("Get user failed!");
    //     console.log(data.message);
    //     return
    //   }

    // }, error => {
    //   alert("Get user error!");
    //   console.log(error);
    //   return
    // }
    // )

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
              // this.modalService.dismissAll();
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

  loadStudents(): void {
    this.api.getUsers(this.currentPage, this.limit).subscribe(
      res => {
        console.log(res);
        var users = JSON.parse(res);
        
        // this.users = users.data.listUser;
        // //change avater url
        // this.users.forEach((user: any) => {
        //   //change localhost to ip
        //   user.avatar = user.avatar.replace("localhost:8888", "139.162.47.239");
        // })
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

  onLoadData() {
    this.getIdea();
    this.getListIdea();
  }


  
  ngOnInit() {
    this.getUserById()
    this.id = this.config.data.id;
   
    this.getIdea();
    this.listComment();
    this.getListIdea();
    this.createAccountForm = this.fb.group({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      role: null,
      department: null,
      avatar: null
    })

    this.loadStudents();

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
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
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

      // if (data.status == 200) {


        // const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
        //   data: {
        //     username: data.data.username,
        //     email: data.data.email,
        //     password: this.editAccountForm?.get('password')?.value,
        //   },
        // });

      //   dialogRef.afterClosed().subscribe(() => {
      //     // Xử lý sau khi dialog đóng lại (nếu cần)
      //   });
      //   this.editAccountForm.reset();

      //   this.router.navigate(['/admin/'])

      //   // this.router.navigate(['/admin'])
      // } else if (data.status == 400) {
      //   alert("Edit Account Failed!")
      // }

    },

      error => {
        alert("Edit Account Failed!")

        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


    }

    // products: any


    // selectProduct(product: any) {
    //     this.ref.close(product);
    // }

    // getSeverity(status: string) {
    //     switch (status) {
    //         case 'INSTOCK':
    //             return 'success';
    //         case 'LOWSTOCK':
    //             return 'warning';
    //         case 'OUTOFSTOCK':
    //             return 'danger';
    //     }
    // }

    
  }
