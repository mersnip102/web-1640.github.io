import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

import Swal from 'sweetalert2';

interface Event {

  name: string,
  deadlineIdea: string,
  deadlineComment: string,


}

@Component({

  templateUrl: './event-and-deadline.component.html',
  styleUrls: ['./event-and-deadline.component.css']
})

export class EventAndDeadLineComponent implements OnInit {

  eventForm!: FormGroup;

  addEvent(data: any) {
    console.log(data);
    const datePipe = new DatePipe('en-US');
    const formattedDateIdea = datePipe.transform(data.deadlineIdea, 'yyyy-MM-dd HH:mm');
    const formattedDateComment = datePipe.transform(data.deadlineComment, 'yyyy-MM-dd HH:mm');

    data.deadlineIdea = formattedDateIdea;
    data.deadlineComment = formattedDateComment;


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addEvent(data).subscribe((response) => {
          const data = JSON.parse(response);
          if (data.status == 200) {
            this.toast.success({ detail: "Add event successfully!", summary: "Success", duration: 3000 });
            this.router.navigate(['admin/eventlist']);
          } else {
            this.toast.error({ detail: "Add event failed!", summary: "Error", duration: 3000 });
          }
        }, (err: any) => {
          this.toast.error({ detail: "Add event failed!", summary: "Error", duration: 3000 });
        }
        )
      }
    })
    //   this.api.addEvent(data).subscribe((response) => {
    //     const data = JSON.parse(response);
    //     if (data.status == 200) {
    //       this.toast.success({ detail: "Edit event successfully!", summary: "Success", duration: 3000 });
    //       this.router.navigate(['admin/eventlist']);
    //     } else {
    //       this.toast.error({ detail: "Edit event failed!", summary: "Error", duration: 3000 });
    //     }
    //   }, (err: any) => {
    //     this.toast.error({ detail: "Edit event failed!", summary: "Error", duration: 3000 });
    //   }
    //   )

    // }



  }


  // getAnEvent() {


  //   this.api.getEvents().subscribe((response) => {
  //     const data = JSON.parse(response);
  //     if(data.status == 200){

  //       this.events = data.data;

  //     } else {
  //       alert("Get events failed!");
  //     }




  //   }, (err: any) => {
  //     alert("Get events failed!");
  //   })
  // }
  Id: any = "";




  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) {
    this.eventForm = this.fb.group({
      

      name: new FormControl('', [Validators.required]),
      deadlineIdea: new FormControl(null, [Validators.required]),
      deadlineComment: new FormControl(null, [Validators.required])
    })
  }
  // ngAfterViewInit(): void {
  //   const now = new Date();
  //   console.log(now);
  //   this.eventForm.get('deadlineIdea')?.valueChanges.subscribe(value => {
      
  //     const deadlineIdea = this.eventForm.get('deadlineIdea')?.value;
  //     if (deadlineIdea < now) {
  //       console.log("deadlineIdea < now");
  //       this.eventForm.get('deadlineIdea')?.setErrors({ incorrect: true });
  //     } else {
  //       this.eventForm.get('deadlineIdea')?.setErrors(null);
  //     }


  //     if(deadlineIdea > this.eventForm.get('deadlineComment')?.value) {
  //       this.eventForm.get('deadlineIdea')?.setErrors({incorrect: true });
  //     } else {
  //       this.eventForm.get('deadlineIdea')?.setErrors(null);
  //     }
  //   });

  //   this.eventForm.get('deadlineComment')?.valueChanges.subscribe(value => {
  //     const deadlineComment = this.eventForm.get('deadlineComment')?.value;
  //     if (deadlineComment < now) {
  //       this.eventForm.get('deadlineComment')?.setErrors({incorrect: true });
  //     } else {
  //       this.eventForm.get('deadlineComment')?.setErrors(null);
  //     }

  //     if(deadlineComment < this.eventForm.get('deadlineIdea')?.value) {
  //       this.eventForm.get('deadlineComment')?.setErrors({incorrect: true });
  //     } else {
  //       this.eventForm.get('deadlineComment')?.setErrors(null);
  //     }
  //   });
    
  // }




  // loadEvents(): void {
  //   this.api.getEvents().subscribe(
  //     res => {
  //       console.log(res);
  //       var events = JSON.parse(res).data;
  //       console.log(events);


  //       for(let event of events) {
  //         let deadlineIdea: Date = new Date(event.deadlineIdea);
  //         if(new Date() > deadlineIdea) {
  //           event['status'] = "Done";
  //         } else {
  //           event['status'] = "Doing";
  //         }

  //       }
  //       this.events = events;
  //       // this.totalPages = Math.ceil(users.data.totalUser / this.limit);
  //       // this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i + 1)
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
  
    this.eventForm.get('deadlineIdea')?.valueChanges.subscribe(value => {
      const now = new Date();
      const deadlineIdea = new Date(Date.parse( this.eventForm.get('deadlineIdea')?.value));
      const deadlineComment = new Date(Date.parse( this.eventForm.get('deadlineComment')?.value));
      
      console.log(now > deadlineIdea? "true" : "false");
      if (deadlineIdea <= now) {
        
        this.eventForm.get('deadlineIdea')?.setErrors({ incorrect: true });
      } else{
        this.eventForm.get('deadlineIdea')?.setErrors(null);
      }
    });

    this.eventForm.get('deadlineComment')?.valueChanges.subscribe(value => {
      const now = new Date();
      const deadlineIdea = new Date(Date.parse( this.eventForm.get('deadlineIdea')?.value));
      const deadlineComment = new Date(Date.parse( this.eventForm.get('deadlineComment')?.value));
      if (deadlineComment <= now) {
        console.log("deadlineComment < now");
        this.eventForm.get('deadlineComment')?.setErrors({incorrect: true });
      } else {
        if(deadlineComment <= deadlineIdea) {
          this.eventForm.get('deadlineComment')?.setErrors({invalid: true });
        } else {
          this.eventForm.get('deadlineComment')?.setErrors(null);
        }
        
      }

      
    });
  }

}


