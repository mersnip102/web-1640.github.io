import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { SuccessDialogComponentComponent } from 'src/app/admin/create-account/success-dialog-component/success-dialog-component.component';
import { ApiService } from 'src/app/api.service';
import { DialogComponentComponent } from 'src/app/dialog-component/dialog-component.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-each-event',
  templateUrl: './each-event.component.html',
  styleUrls: ['./each-event.component.css']
})
export class EachEventComponent {
  ngListCategory = [ "Category 1", "Category 2","Category3"];
  categories: any[] = [];

  event: any

  imageSrc?: SafeUrl;
  pdfSrc?: SafeUrl;

  // users: User[] = []; // List of users
  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;


 
  totalItems?: number; // Total number of users

  page?: number;

  accounts?: any[];

  createIdeaForm!: FormGroup;
  fileContent?: string;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog, private api: ApiService, private router: Router, private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) { }

  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
  ngOptionrole = ["Admin", "QAM", "QAC", "Staff"];
  public aElement?: boolean = true;

  // openDialog() {
  //   this.dialog.open(DialogComponentComponent, {
  //     data: {
  //       imgSrc: this.imageSrc
  //     }
  //   });
  // }


  onClick() {
    this.getlistCategory();


  }
  currentFile?: File;
  // file?: File;
  onRemoveFile(): void {
    
   
    
    
    this.createIdeaForm.get('files')!.setValue(undefined);
    this.imageSrc = undefined;
    
    
  }

  onFileSelected(event: any): void {
    this.imageSrc = undefined;

    
    // this.createIdeaForm.get('files')!.setValue(this.file);

    const file = event.target.files[0];
    // this.createIdeaForm.get('files')!.setValue(file);
    // console.log(file);

    if (file.type.includes('image/')) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const url = fileReader.result as string;
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(url);
        console.log(this.imageSrc)
      };
      fileReader.readAsDataURL(file);
    }
    this.createIdeaForm.get('files')!.setValue(file);

    
    // const fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   this.fileContent = fileReader.result as string;
    //   this.imageSrc = this.fileContent;
    // };
    // fileReader.readAsDataURL(file);
  
    // else if (file.type.includes('application/pdf')) {
    //   console.log("pdf");
    // } else {
    //   alert('File type not supported');
    // }


    // console.log(file);
    // this.createAccountForm.get('avatar')?.setValue(this.currentFile);




  }

  getlistCategory() {
    this.api.getCategory().subscribe((res: any) => {
      
     console.log(res)
     this.categories = res.data.list
    })


  }

  receiveIdea($event:any) {
    console.log($event);
    this.getListIdea();
    this.cdr.detectChanges();
  }

  ideas: any[] = [];

  getListIdea() {

    let params= {
      eventId: this.route.snapshot.params['id']
      

    }

    console.log(params);
    
    
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(localStorage.getItem('accessToken'));
    
    console.log(data);

    
    
    this.api.getIdeas(this.currentPage, this.limit, params).subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      // var category = ""
     
      if (data.status == 200) {
        this.ideas = data.data.listIdea;
        
        this.ideas?.forEach((idea: any) => {

          // //get user name
          // this.api.getUserById(idea.user.userId).subscribe((d: any) => {
          //   idea.userName = d.data.firstName + " " + d.data.lastName
          //   idea.avatarUser = d.data.avatar
          //   console.log(d);
          //   return
          // }, err => {
          //   console.log(err);
          //   idea.userName = ""
          //   return
          // })
          
          // // get event name
          // this.api.getEventById(idea.event.id).subscribe((res: any) => {
          //   idea.eventName = res.data.name
          //   console.log(idea.eventName);
          //   return
          // },
          // error => {
          //   console.log(error);
          //   idea.eventName = ""
          //   return
          // })
          
          // //add category name
          // this.api.getCategory().subscribe((res: any) => {
          //   //get name category
          //   var d = res.data.list
          //   console.log(d);
          //   d.forEach((c: any) => {
              
          //     if (c.id == idea.categoryId) {
          //       //add category name to ideas
          //       idea.categoryName = c.name
          //       console.log(idea.categoryName);
          //     }
          //   })
          // })
          
        })
        
        this.totalPages = Math.ceil(data.data.totalIdea / this.limit);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)

        
        
        // this.totalItems = data.data.totalItems;
        // this.totalPages = data.data.totalPages;
        // this.pageArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        // console.log(this.pageArray);

      } else {
        this.toast.error({ detail: "Get idea failed!" });
        console.log(data.message);
        return
      }

    }, error => {
      this.toast.error({ detail: "Get idea failed!" });
      console.log(error);
      return
    }
    )

  }

  getIdeaByEventId() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.api.getIdeaByEvent(id).subscribe((res: any) => {
      this.ideas = res.data.listIdea;
      console.log(res);
    }, (err: any) => {
      console.log(err)
      this.toast.error({ detail: "Get idea failed", duration: 3000 });
    }
    )
  }

  

  allowCreateIdea: boolean = true;

  getEvent() {
    const id = this.route.snapshot.params['id'];
    this.api.getEventById(id).subscribe((res: any) => {
      this.event = res.data;
      
      console.log(new Date(this.event.deadlineIdea))
     
      if (new Date(this.event.deadlineIdea) < new Date()) {
        this.allowCreateIdea = false;
      }
    // this.api.getEvents().subscribe((res: any) => {
    //   const data = JSON.parse(res);
    //   // console.log(res.data.list[0].id);

      
    //   this.event = data.data.list.find((event: any) => event.id == this.route.snapshot.params['id'])
    //   // console.log(this.event)
    
     
    })

  }

  addAnIdea(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {

        var formData: any = new FormData();
        console.log(this.createIdeaForm.value)
        const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');

        formData.append('content', this.createIdeaForm.get('content')!.value?.toString());
        formData.append('files', this.createIdeaForm.get('files')!.value);
        formData.append('title', this.createIdeaForm.get('title')!.value);
        formData.append('anonymous', this.createIdeaForm.get('anonymous')!.value);
        formData.append('categoryId', this.createIdeaForm.get('categoryId')!.value);
        console.log(this.route.snapshot.params['id'])
        formData.append('eventId', this.route.snapshot.params['id']);
        

        console.log(formData.get('eventId'))
        
    
        this.api.addIdea(formData
        ).subscribe(res => {
          console.log(res)
          location.reload();
         
              this.createIdeaForm.reset();
              Swal.fire(
                'Added!',
                'Your idea has been added.',
                'success'
              )

              this.toast.success({ detail: "Add idea successful!", duration: 3000, position: "top-right" })
           
    
          
           
    
            
    
        }, error => {

          this.toast.error({ detail: "Add idea failed!", duration: 3000, position: "top-right" })
            console.log(error)
            // this.router.navigate(['/login']);
          }
    
        );
       
      }
    })
  }


  // user: User = {
  //   avatar: '',
  //   department: '',
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   password: '',
  //   userId: 0,
  //   role: '',
  //   username: '',
  // }

  // getAnUser(id: number) {
  //   console.log(id);
  //   this.api.getUsers().subscribe((d: any) => {
  //     var data = JSON.parse(d);
  //     console.log(data);
  //     if (data.status == 200) {
  //       //filter user by id

  //       let user = data.data.listUser.filter((user: any) => user.userId == id)[0];
  //       console.log(user);
  //       //set value for formcontrol
  //       console.log(this.editAccountForm.value);
  //       for (let key in this.editAccountForm.value) {
  //         if (key == "avatar") continue;
  //         this.editAccountForm.get(key)?.setValue(user[key]);
  //       }

  //       console.log(this.editAccountForm.value);

  //     } else {
  //       alert("Get user failed!");
  //       console.log(data.message);
  //       return
  //     }

  //   }, error => {
  //     alert("Get user error!");
  //     console.log(error);
  //     return
  //   }
  //   )

  // }


  // editUser(id: any) {
  //   if (confirm("Are you sure to edit this account?")) {
  //     console.log(this.editAccountForm.get('userId')?.value);

  //     var formData: any = new FormData();
  //     for (let key in this.editAccountForm.value) {
  //       console.log(key);
  //       formData.append(key, this.editAccountForm.get(key)!.value);
  //     }
  //     console.log(formData);

  //     this.api.editUser(id, formData
  //     ).subscribe(async (res: any) => {
  //       var data = JSON.parse(res);

  //       if (data.status == 200) {

  //         // Reload current page
  //         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //           this.router.navigate(['/admin/accountmanager']).then(() => {
  //             this.modalService.dismissAll();
  //             Swal.fire("Account edited successfully!", "", "success");
  //             // this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })


  //           })
  //         })


  //         // this.router.navigate(['/admin'])
  //       } else if (data.status == 400) {
  //         this.toast.warning({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
  //         alert("Edit Account Failed!")

  //       }

  //     },

  //       error => {
  //         this.toast.error({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
  //         console.log(error)

  //       });


  //   }




  // }

  // loadStudents(): void {
  //   this.api.getUsers(this.currentPage, this.limit).subscribe(
  //     res => {
  //       console.log(res);
  //       var users = JSON.parse(res);
        
  //       // this.users = users.data.listUser;
  //       // //change avater url
  //       // this.users.forEach((user: any) => {
  //       //   //change localhost to ip
  //       //   user.avatar = user.avatar.replace("localhost:8888", "139.162.47.239");
  //       // })
  //       console.log(users);
  //       this.totalPages = Math.ceil(users.data.totalUser / this.limit);
  //       this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // changePage(i: number): void {
  //   // const element = document.getElementById('paginator');
  //   // element!.classList.add('active');


  //   this.currentPage = i
  //   this.loadStudents();
  // }


  // nextPage() {
  //   this.currentPage++;
  //   this.loadStudents();
  // }

  // previousPage() {
  //   this.currentPage--;
  //   this.loadStudents();
  // }



  ngOnInit() {
    this.getEvent();
    // this.getIdeaByEventId();

    this.getListIdea();
    
    
    this.createIdeaForm = this.fb.group({
      files: new FormControl(null),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      content: new FormControl('', [Validators.required, Validators.minLength(3)]),
      anonymous: new FormControl(null, [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required, Validators.minLength(3)]),
      eventId: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      // files: new FormControl(null, [Validators.required]),

    })

   

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


  // editAccountForm = new FormGroup({
  //   userId: new FormControl(0),
  //   avatar: new FormControl(null),
  //   firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

  //   email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),

  //   role: new FormControl('', [Validators.required]),
  //   department: new FormControl('', [Validators.required])
  // })

  // delete(id: number) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.api.deleteUser(id).subscribe((data: any) => {
  //         // Swal.fire(
  //         //   'Deleted!',
  //         //   'Your file has been deleted.',
  //         //   'success'
  //         // )
  //         this.toast.success({ detail: "Delete Account Success!", duration: 3000, position: "top-right" })
  //         this.loadStudents();
  //       },

  //         error => {
  //           Swal.fire(
  //             'Failed!',
  //             'Delete failed.',
  //             'error'
  //           )
  //         }
  //       )
  //     }
  //   })
  // }

  //   // if (confirm("Are you sure you want to delete this account?")) {
  //   //   this.api.deleteUser(id).subscribe((data: any) => {
  //   //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //   //       this.router.navigate(['/admin/accountmanager']).then(() => {
  //   //         this.modalService.dismissAll();
  //   //         this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })
  //   //       })
  //   //     })



  //   //   },
  //   //     error => {
  //   //       alert("Delete Failed!")
  //   //     }

  //   //   );
  //   // }

  // // }




  // EditAccountForm(data: any) {
  //   //get password from localstorage
  //   var formData: any = new FormData();

  //   formData.append('firstName', this.editAccountForm.get('firstName')!.value?.toString());
  //   formData.append('lastName', this.editAccountForm.get('lastName')!.value);
  //   formData.append('username', this.editAccountForm.get('username')!.value);
  //   formData.append('email', this.editAccountForm.get('email')!.value);
  //   formData.append('role', this.editAccountForm.get('role')!.value);
  //   formData.append('password', this.editAccountForm.get('password')!.value);
  //   formData.append('department', this.editAccountForm.get('department')!.value);

  //   this.api.createNewAccount(formData
  //   ).subscribe(res => {

  //     // alert("Login Successful!");
  //     var data = JSON.parse(res)

  //     console.log(res);
  //     console.log(data.data.username);

  //     if (data.status == 200) {


  //       const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
  //         data: {
  //           username: data.data.username,
  //           email: data.data.email,
  //           password: this.editAccountForm?.get('password')?.value,
  //         },
  //       });

  //       dialogRef.afterClosed().subscribe(() => {
  //         // Xử lý sau khi dialog đóng lại (nếu cần)
  //       });
  //       this.editAccountForm.reset();

  //       this.router.navigate(['/admin/'])

  //       // this.router.navigate(['/admin'])
  //     } else if (data.status == 400) {
  //       alert("Edit Account Failed!")
  //     }

  //   },

  //     error => {
  //       alert("Edit Account Failed!")

  //       console.log(error)
  //       // this.router.navigate(['/login']);
  //     }

  //   );


  // }

  
}
