import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../api.service';

@Component({
 
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit{
  eventForm!: FormGroup;
  events: any[] = [];

  navigateToEvent(id: number) {
    this.router.navigateByUrl('/staff', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/staff/event', id]);
      // this.router.navigate([this.route.snapshot.url.join('/')]);
    });
   
  }

  ngListEvent = ["Event 1", "Event 2", "Event 3", "Event 4", "Event 5"];
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

  ngOnInit(): void {
    this.loadEvents()
    
  }

  
  loadEvents(): void {
    this.api.getEvents().subscribe(
      (res:any) => {
        
        var events = res.data.list;
        


        // for (let event of events) {
        //   let deadlineIdea: Date = new Date(event.deadlineComment);
        //   if (new Date() > deadlineIdea) {
        //     event['status'] = "Done";
        //   } else {
        //     event['status'] = "Doing";
        //   }

        // }
        this.events = events;
        // this.totalPages = Math.ceil(users.data.totalUser / this.limit);
        // this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i + 1)
      },
      error => {
        console.log(error);
      }
    );
  }
  

}
