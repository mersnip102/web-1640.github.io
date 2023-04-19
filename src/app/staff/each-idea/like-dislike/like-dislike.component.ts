import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.css']
})
export class LikeDislikeComponent {

 

  constructor(
    private cdr: ChangeDetectorRef,
    private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private toast: NgToastService) {
   
     }
  

  @Output() ideaEvent = new EventEmitter();
  @Input() idea!: any;
  isLiked = false;
  isDisliked = false;

  like(id: any) {
    this.api.likeIdea(id).subscribe(async (res: any) => {
      console.log(res);
        this.ideaEvent.emit("abc")
        this.cdr.detectChanges();
        // this.cdr.markForCheck(); 
      
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
        
        this.ideaEvent.emit("abc")
        this.cdr.detectChanges(); // Thêm dòng này
      }
    }, error => {
      this.toast.error({ detail: "Like idea failed!" });
      console.log(error);
      return
    }
    )
  }

}
