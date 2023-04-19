import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-staff-home-page',
  templateUrl: './staff-home-page.component.html',
  styleUrls: ['./staff-home-page.component.css']
})
export class StaffHomePageComponent implements OnInit {
  // ngListEvent = [ "All Event", "Category 1", "Department1","All Idea"];
  // ngListCategory = [ "All Category", "Category 1", "Category 2","Category3"];
  // ngListDepartment = [ "All Department", "Department 1", "Department 2","Department3"];
  // ngFilterIdea =[ "All Idea", "Most Popular Idea", "Most Viewed Idea","Least Idea"];


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

  onClick(id:any) {
    this.postId = id
  }


 
  totalItems?: number; // Total number of users

  page?: number;

  ideas: any[] = [];
  comments?: any[] = [];
  totalComments?: number;

  createAccountForm!: FormGroup;

  constructor(private api: ApiService, private router: Router,
    private cdr: ChangeDetectorRef,
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

    receiveIdea($event:any) {
      console.log($event);
      this.getListIdea();
      this.cdr.detectChanges();
    }
    arrayBip: any[] = [];
    


    onDropdownEvent(selectedValue: any) {
      this.eventSelected = selectedValue.target.value;
      this.arrayBip = [];
      if(this.eventSelected != null && this.eventSelected != undefined && this.eventSelected != "0"){
        this.arrayBip.push(this.eventSelected)
      }
      if(this.categorySelected != null && this.categorySelected != undefined && this.categorySelected != "0"){
        this.arrayBip.push(this.categorySelected)
      }
      if(this.departmentSelected != null && this.departmentSelected != undefined && this.departmentSelected != "0"){
        this.arrayBip.push(this.departmentSelected)
      }
      this.getListIdea();
    }
  
    onDropdownCategory(selectedValue: any) {
      this.categorySelected = selectedValue.target.value;
      this.arrayBip = [];
      if(this.eventSelected != null && this.eventSelected != undefined && this.eventSelected != "0"){
        this.arrayBip.push(this.eventSelected)
      }
      if(this.categorySelected != null && this.categorySelected != undefined && this.categorySelected != "0"){
        this.arrayBip.push(this.categorySelected)
      }
      if(this.departmentSelected != null && this.departmentSelected != undefined && this.departmentSelected != "0"){
        this.arrayBip.push(this.departmentSelected)
      }
      
      this.getListIdea();
    }
  
    onDropdownDepartment(selectedValue: any) {
      this.departmentSelected = selectedValue.target.value;
      this.arrayBip = [];
      if(this.eventSelected != null && this.eventSelected != undefined && this.eventSelected != "0"){
        this.arrayBip.push(this.eventSelected)
      }
      if(this.categorySelected != null && this.categorySelected != undefined && this.categorySelected != "0"){
        this.arrayBip.push(this.categorySelected)
      }
      if(this.departmentSelected != null && this.departmentSelected != undefined && this.departmentSelected != "0"){
        this.arrayBip.push(this.departmentSelected)
      }
     
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

    this.api.getIdeas(this.currentPage, this.limit, params).subscribe((d: any) => {
      var data = JSON.parse(d);
      // console.log(data.data.listIdea[0].file.file[0]);
      // var category = ""
      if (data.status == 200) {
        this.ideas = data.data.listIdea;
        
        this.ideas?.forEach((idea: any) => {

        })
        
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


  changePage(i: number): void {

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



  ngOnInit() {
    
    
    // this.getAnUser();
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


