import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { ModalContainerComponent } from 'ngx-bootstrap/modal';


interface Event {
  id: number,
  name: string,
  deadlineIdea: string,
  deadlineComment: string,
  totalIdea: number,
  totalDislike: number,
  totalLike: number,
  totalComment: number,
  createdAt: string,
  updatedAt: string,
  status: string

}
@Component({

  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = []; // List of users
  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;
  ststus: string = "";

  

  
  @ViewChild('myModal', { static: true }) myModal!: ElementRef;

  pagedEvents: Event[] = []; // List of users for current page
  totalItems?: number; // Total number of users

  page?: number;
  modalRef!: NgbModalRef;


  accounts?: any[];

  eventForm!: FormGroup;

  constructor(private api: ApiService, private router: Router, private modalService: NgbModal,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) {
    this.eventForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      deadlineIdea: ['', Validators.required],
      deadlineComment: ['', Validators.required],
      totalIdea: ['', Validators.required],
      totalDislike: ['', Validators.required],
      totalLike: ['', Validators.required],
      totalComment: ['', Validators.required],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required]
    })
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteEvent(id).subscribe(async (res: any) => {
          this.toast.success({ detail: 'Delete event successfully!', position: 'top-right', duration: 3000 })
          this.loadEvents();
        }, error => {
          this.toast.error({ detail: 'Error deleting event', position: 'top-right', duration: 3000 })
        })
      } 
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Your imaginary file is safe :)',
      //     'error'
      //   ) 
      // }
    })
  }


 

  editEvent(data: any) {
    
    console.log(data);
    const datePipe = new DatePipe('en-US');
    const formattedDateIdea = datePipe.transform(data.deadlineIdea, 'yyyy/MM/dd HH:mm');
    const formattedDateComment = datePipe.transform(data.deadlineComment, 'yyyy/MM/dd HH:mm');

    data.deadlineIdea = formattedDateIdea;
    data.deadlineComment = formattedDateComment;

    console.log(data);



    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.editEvent(data).subscribe(async (res: any) => {
          
          
              this.loadEvents();
              // this.myModal.nativeElement.hide();
              // this.myModal.nativeElement.setAttribute('data-dismiss', 'modal');
             
              Swal.fire(
                'Edited!',
                'Your imaginary file has been edited.',
                'success'
              ).then((result) => {
                if(result.isConfirmed){
                  window.location.reload();

                }
                
                  // this.myModal.nativeElement.hide();
                  
                
              })
        
          
        }, error => {
          this.toast.error({ detail: 'Error editing event', position: 'top-right', duration: 3000 })
        })
      } 
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Your imaginary file is safe :)',
      //     'error'
      //   ) 
      // }
    })



  }

  getAnEvent(id: any) {

    //get event by id
    this.api.getEvents().subscribe(
      (res:any) => {
       

        var events =res.data.list

        let event = events.filter((event: any) => event.id == id)[0];
       

        //convert date to dd/mm/yyyy - dùng moment cũng đc để chuyển giữa múi giờ.
        // let deadlineIdea: Date = new Date(event.deadlineIdea);
        // let deadlineComment: Date = new Date(event.deadlineComment);
        // event.deadlineIdea = deadlineIdea.getDate() + "/" + (deadlineIdea.getMonth() + 1) + "/" + deadlineIdea.getFullYear();
        // event.deadlineComment = deadlineComment.getDate() + "/" + (deadlineComment.getMonth() + 1) + "/" + deadlineComment.getFullYear();
        // const datePipe = new DatePipe('en-US');
        // const formattedDateIdea = datePipe.transform(event.deadlineIdea, 'yyyy-MM-dd');
        // console.log(formattedDateIdea);

        // const formattedDateComment = datePipe.transform(event.deadlineComment, 'yyyy-MM-dd');
        // console.log(formattedDateComment);

        // event.deadlineIdea = formattedDateIdea;
        // event.deadlineComment = formattedDateComment;
        const datePipe = new DatePipe('en-US');
       
      const dateObj1 = new Date(event.deadlineIdea);
      const dateObj2 = new Date(event.deadlineComment);
      const formattedDate1 = datePipe.transform(dateObj1, 'yyyy-MM-dd HH:mm');
      const formattedDate2 = datePipe.transform(dateObj2, 'yyyy-MM-dd HH:mm');
      event.deadlineIdea = formattedDate1
        event.deadlineComment = formattedDate2
        console.log(event.deadlineIdea);
        this.eventForm.patchValue(event);
        console.log(this.eventForm);

      }, error => {
        console.log(error);
      }
    );


  }


  loadEvents(): void {
    this.api.getEvents().subscribe(
      (res:any) => {
        console.log(res);
        var events = res.data.list;
        console.log(events);

        


        for (let event of events) {
          let deadlineIdea: Date = new Date(event.deadlineComment);
          if (new Date() > deadlineIdea) {
            event['status'] = "Done";
          } else {
            event['status'] = "Doing";
          }

        }
        this.events = events;
        // this.totalPages = Math.ceil(users.data.totalUser / this.limit);
        // this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i + 1)
      },
      error => {
        console.log(error);
      }
    );
  }

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



    this.loadEvents();
  
   
    this.eventForm.get('deadlineIdea')?.valueChanges.subscribe(value => {
      console.log(this.eventForm.get('deadlineIdea')?.value);
      console.log(this.eventForm.get('deadlineComment')?.value);

      console.log(this.eventForm.errors);
      
      const now = new Date();
      const deadlineIdea = new Date(Date.parse( this.eventForm.get('deadlineIdea')?.value));
      const deadlineComment = new Date(Date.parse( this.eventForm.get('deadlineComment')?.value));
      
      
      // if (deadlineIdea <= now) {
        
      //   this.eventForm.get('deadlineIdea')?.setErrors({ incorrect: true });
      // } else{
        if(deadlineComment <= deadlineIdea) {
          this.eventForm.get('deadlineIdea')?.setErrors({invalid: true });
        } else {
          console.log("this.eventForm.valid");
          this.eventForm.get('deadlineIdea')?.setErrors(null);
        }
        
      // }


      // if(deadlineIdea > deadlineComment) {
      //   this.eventForm.get('deadlineIdea')?.setErrors({incorrect: true });
      // } else {
      //   this.eventForm.get('deadlineIdea')?.setErrors(null);
      // }
    });

    this.eventForm.get('deadlineComment')?.valueChanges.subscribe(value => {
      console.log(this.eventForm.get('deadlineIdea')?.value);
      console.log(this.eventForm.get('deadlineComment')?.value);

      
    
      const now = new Date();
      const deadlineIdea = new Date(Date.parse( this.eventForm.get('deadlineIdea')?.value));
      const deadlineComment = new Date(Date.parse( this.eventForm.get('deadlineComment')?.value));
      // if (deadlineComment <= now) {
        
      //   this.eventForm.get('deadlineComment')?.setErrors({incorrect: true });
      // } else {
        if(deadlineComment <= deadlineIdea) {
          this.eventForm.get('deadlineComment')?.setErrors({invalid: true });
        } else {
          console.log("this.eventForm.valid");
          this.eventForm.get('deadlineComment')?.setErrors(null);
        }
        
      // }

      
    });

  }



}
