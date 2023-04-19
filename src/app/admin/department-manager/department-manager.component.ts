import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

import Swal from 'sweetalert2'; 

interface Department {
  id: number,
  name: string,
  // createdAt: string,
  // updatedAt: string

}
@Component({
  
  templateUrl: './department-manager.component.html',
  styleUrls: ['./department-manager.component.css']
})
export class DepartmentManagerComponent implements OnInit{
 
  status: any;
  departmentForm!: FormGroup;
  department: any

  // departments: Category[] = [];

  departments: any[] = [];
  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];


  isShowForm = false;

  editDepartmentForm = new FormGroup({
   
    
    department: new FormControl('', [Validators.required, Validators.minLength(2)]),
    
    
  })

  
  getlistDepartment() {
    this.api.getDepartment().subscribe((res: any) => {
      
     console.log(res.data.list);
     this.departments = res.data.list
    })


  }
  

  deleteDepartment(id: number) {
    console.log(id);
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteDepartment(id).subscribe(async (res: any) => {

          if (res.status == 200) {
            // await this.getlistCategory();
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/department']).then(() => {
                this.getlistDepartment()
    
                this.toast.success({ detail: "Delete Department Success!", duration: 3000, position: "top-right" })
              })
            })
    
          }
    
        }, (err: any) => {
          // this.toast.error({ detail: "Delete Department failed!", duration: 3000, position: "top-right" })
          // this.getlistDepartment()
          // console.log(err);
          // // location.reload();
          console.log(err);

          this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/department']).then(() => {
              this.getlistDepartment()
  
              this.toast.error({ detail: "Delete Department failed!", duration: 3000, position: "top-right" })
            })
          })
    
    
        }
        )
        
      } 
    })
   

  }


  addDepartment() {
    


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addDepartment(this.departmentForm.value.name).subscribe(async (res: any) => {
          if (res.status == 200) {
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/department']).then(() => {
                this.toast.success({ detail: "Add Department Success!", duration: 3000, position: "top-right" })
              })
            })
          }
        }, (err: any) => {
          this.toast.error({ detail: "Add Department failed!", duration: 3000, position: "top-right" })
          console.log(err);
          // location.reload();
        }
        )
      }
    })

    // this.categoryForm.reset();


  }

  getADepartment(id: number) {
    this.department = this.departments.find((item: any) => item.id == id);
    console.log(this.department);
    this.editDepartmentForm.get('department')?.setValue(this.department.name)
  }

  editDepartment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.editDepartment(id, this.editDepartmentForm.value.department!).subscribe(async (res: any) => {
          if (res.status == 200) {
            this.router.navigateByUrl('/admin', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/department']).then(() => {
                this.toast.success({ detail: "Edit Department Success!", duration: 3000, position: "top-right" })
              })
            })
          }
        }, (err: any) => {
          this.toast.error({ detail: "Edit Department failed!", duration: 3000, position: "top-right" })
          console.log(err);
          // location.reload();
        }
        )
      }
    })
  }






  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, private toast: NgToastService) {

    this.departmentForm = this.fb.group({

      name: new FormControl('', [Validators.required]),
      createdAt: new FormControl(null),
      updatedAt: new FormControl(null)
    }, {Validators: false})

  } //dependency injection





  ngOnInit(): void {
    // this.newAccount();
    this.getlistDepartment();

  }

}
