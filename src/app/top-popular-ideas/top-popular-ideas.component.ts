import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-top-popular-ideas',
  templateUrl: './top-popular-ideas.component.html',
  styleUrls: ['./top-popular-ideas.component.css']
})
export class TopPopularIdeasComponent implements OnInit {
  
  ngListEvent: any[] = [];
  ngListCategory: any[] = [];
  ngListDepartment: any[] = [];
  
  ngFilterIdea: any =[
    {id: "0", name: "All Idea"},
    {id: "most_total_views", name: "Most Total Views"},
    {id: "latest_comments", name: "Latest comments"},
    {id: "popular_idea", name: "Most Popular Idea"},
    {id: "latest_idea", name: "Latest Idea"},
  ];

  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;

  postId!: number;


 
  totalItems?: number; // Total number of users

  page?: number;

  ideas: any[] = [];
  comments?: any[] = [];
  totalComments?: number;

  createAccountForm!: FormGroup;

  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private toast: NgToastService) {
      this.getListDepartment();
    this.getListCategory();
    this.getListEvent();
    }

    categorySelected!: any;
    eventSelected!: any;
    departmentSelected!: any;

    ngFilterSelected!: any;

    onDropdownEvent(selectedValue: any) {
      this.eventSelected = selectedValue.target.value;
      this.getListIdea();
    }
  
    onDropdownCategory(selectedValue: any) {
      this.categorySelected = selectedValue.target.value;
      this.getListIdea();
    }
  
    onDropdownDepartment(selectedValue: any) {
      this.departmentSelected = selectedValue.target.value;
      this.getListIdea();
    }

    onDropdownFilter(selectedValue: any) {
      this.ngFilterSelected = selectedValue.target.value;
      this.getListIdea();
    }

  

    getListDepartment() {
    this.api.getListDepartment().subscribe((res: any) => {
      this.ngListDepartment.push({id: 0, name: "All Department"})
      res.data.list.forEach((department: any) => {
        this.ngListDepartment.push({id: department.id, name: department.name})
      })
      
     
      
      
    })
   
    
  }


  getListCategory() {
    this.api.getListCategory().subscribe((res: any) => {
      this.ngListCategory.push({id: 0, name: "All Category"})
      res.data.list.forEach((category: any) => {
        this.ngListCategory.push({id: category.id, name: category.name})
      })

      
     
    })
   
  }


  getListEvent() {
    this.api.getEvents().subscribe((res: any) => {
      this.ngListEvent.push({id: 0, name: "All Event"})
      res.data.list.forEach((event: any) => {
        this.ngListEvent.push({id: event.id, name: event.name})
      })

      
     
    })
    
  }
  

  

 
  
  


  getListIdea() {

    let params= {
      eventId: this.eventSelected,
      categoryId: this.categorySelected,
      departmentId: this.departmentSelected,
      sort: this.ngFilterSelected

    }
    
    
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(localStorage.getItem('accessToken'));
    
    console.log(data);

    
    
    this.api.getIdeas(this.currentPage, this.limit, params).subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      var category = ""
     
      if (data.status == 200) {
        this.ideas = data.data.listIdea;
        
        this.ideas?.forEach((idea: any) => {

          //get user name
          this.api.getUserById(idea.user.userId).subscribe((d: any) => {
            idea.userName = d.data.firstName + " " + d.data.lastName
            idea.avatarUser = d.data.avatar
            console.log(d);
            return
          }, err => {
            console.log(err);
            idea.userName = ""
            return
          })
          
          // get event name
          this.api.getEventById(idea.event.id).subscribe((res: any) => {
            idea.eventName = res.data.name
            console.log(idea.eventName);
            return
          },
          error => {
            console.log(error);
            idea.eventName = ""
            return
          })
          
          //add category name
          this.api.getCategory().subscribe((res: any) => {
            //get name category
            var d = res.data.list
            console.log(d);
            d.forEach((c: any) => {
              
              if (c.id == idea.categoryId) {
                //add category name to ideas
                idea.categoryName = c.name
                console.log(idea.categoryName);
              }
            })
          })
          
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


  changePage(i: number): void {
    // const element = document.getElementById('paginator');
    // element!.classList.add('active');


    this.currentPage = i
    this.getListIdea();
  }


  nextPage() {
    this.currentPage++;
    this.getListIdea();
  }

  previousPage() {
    this.currentPage--;
    this.getListIdea();
  }



  



  onClick(id:any) {
    this.postId = id
  }

  

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

  getComment(ideaId: number) {
    this.api.getComment(ideaId).subscribe((res: any) => {
      this.comments = res.data.listComment;
    })
  }

  dislike(id: any) {
    this.api.dislikeIdea(id).subscribe(async (res: any) => {
      console.log(res);
      if (res.status == 200) {
        
       
        
      }
    }, error => {
      this.toast.error({ detail: "Like idea failed!" });
      console.log(error);
      return
    }
    )
  }

  

  

 
  getAnUser() {
    
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(data);
    
    this.api.getUsers().subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      if (data.status == 200) {
        //filter user by id

        let user = data.data.listUser.filter((user: any) => user.userId == data.id)[0];
        console.log(user.avatar);
        //set value for formcontrol
        

      }

    }, error => {
      this.toast.error({ detail: "Get user failed!" });
      console.log(error);
      return
    }
    )

  }

  //get category name
  getCategoryName() {
    this.api.getCategory().subscribe((res: any) => {
      //get name category
      var d = res.data.list
      console.log(d);
      d.forEach((c: any) => {
        console.log(c);
        if (c.id == this.createAccountForm.value.categoryId) {
          this.createAccountForm.value.categoryName = c.name
        }
      })
    })
  }

  
  ref!: DynamicDialogRef;
  getTotalUser() {
    this.api.getUsers().subscribe((res: any) => {
      var data = JSON.parse(res);
      if (data.status == 200) {
        this.totalItems = res.data.totalUser;
      } else {
        this.toast.error({ detail: "Get user failed!" });
        console.log(data.message);
        return
      }
     
    }, error => {
      this.toast.error({ detail: "Get user failed!" });
      console.log(error);
      return
    })
   }
  getListPopularIdea() {
    
    this.api.getIdeas(this.currentPage, this.limit, {sort: "popular_idea"}).subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      var category = ""
     
      if (data.status == 200) {
        this.ideas = data.data.listIdea;
         
        
        this.totalPages = Math.ceil(data.data.totalIdea / this.limit);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)

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

  loadStudents(): void {
    this.api.getUsers(this.currentPage, this.limit).subscribe(
      res => {
        console.log(res);
        var users = JSON.parse(res);
        
      
        console.log(users);
        this.totalPages = Math.ceil(users.data.totalUser / this.limit);
        console.log(this.totalPages);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)
      },
      error => {
        console.log(error);
      }
    );
  }



  ngOnInit() {
    this.getListPopularIdea();
    this.getTotalUser();
    
    // this.getAnUser();
    // this.getListIdea();
    this.createAccountForm = this.fb.group({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      role: null,
      department: null,
      avatar: null
    })

    // this.loadStudents();

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


    

    

}




