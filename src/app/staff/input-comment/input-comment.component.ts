import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/api.service';
import { EachIdeaComponent } from '../each-idea/each-idea.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})
export class InputCommentComponent implements OnInit {
  comment: string = '';
  @Input() postId!: number;
  @Input() allowComment!: boolean;

  uploadedFiles: File[] = [];

  onSelect(event: any) {
        for(let file of event.files) {
            //check error
            if(file.size <= 5000000) {
                this.uploadedFiles.push(file);
            }

        }

        console.log(this.uploadedFiles)

        
    }

    onClear(event: any) {
        this.uploadedFiles = [];
      console.log(this.uploadedFiles)
      
  }

  onRemove(event: any) {
    
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
    console.log(this.uploadedFiles)


  
}

 commentText!: string;
  selectedImage: any;

  onImageSelect(event: any) {
    if (event.files && event.files.length) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.files[0]);
      fileReader.onload = () => {
        this.selectedImage = fileReader.result;
      };
    }
  }

createComment() {

    let formData = new FormData();
    formData.append('content', this.commentForm.value.content);
    formData.append('anonymous', this.commentForm.value.anonymous.toString());
    formData.append('ideaId', this.postId.toString());
    console.log(formData.get('content'));
    console.log(formData.get('anonymous'));
    console.log(formData.get('ideaId'));
    this.api.createComment(formData).subscribe(data => {
      console.log(data);
      
      this.ideaEvent.emit("abc")
      this.cdr.detectChanges();
      this.commentForm.reset()
      
    }, error => {
      
     
      this.toast.error({ detail: "Comment failed!", duration: 3000, position: "top-right" })
      this.comment = '';
      console.log(error)
      // this.router.navigate(['/login']);

    }
    );
  }

  commentForm!: FormGroup;
  @Output() loadData = new EventEmitter();

constructor(
  private cdr: ChangeDetectorRef,
  public dialogService: DialogService,
  private api: ApiService, private router: Router, 
  private route: ActivatedRoute, private http: HttpClient,
  private fb: FormBuilder, private toast: NgToastService) {
    
    

  }
  user!: any;
  getUserById() {
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    this.api.getUserById(data.id).subscribe((res: any) => {
      console.log(res.data);
      this.user = res.data;
    })

   }
  ngOnInit(): void {
    this.getUserById()
    this.commentForm = this.fb.group({
      content: ['' ],
      anonymous: [false]
    })
  }


  ref!: DynamicDialogRef;

  show(id: any) {
      this.ref = this.dialogService.open(EachIdeaComponent, {
          header: 'Select a Product',
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

  ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
  }

  @Output() ideaEvent = new EventEmitter<string>();
  addComment(data: any) {
    const d = {
      comment: this.commentForm.value.comment,
      anonymous: this.commentForm.value.anonymous
    }
    this.api.createComment(data).subscribe(data => {
      console.log(data);
     
      this.commentForm.reset()
    }, error => {
     
      console.log(error)
      this.toast.error({ detail: "Comment failed!", duration: 3000, position: "top-right" })
    }
    );
  }


  updateComment(id: any, comment: any) {
    const d = {
      comment: this.commentForm.value.comment,
      anonymous: this.commentForm.value.anonymous
    }
    this.api.updateComment(id, comment).subscribe(data => {
      console.log(data);
      this.toast.success({ detail: "Comment successfully!", duration: 3000, position: "top-right" })
     
      this.commentForm.reset()
    }, error => {
      this.commentForm.reset()
      this.toast.error({ detail: "Comment failed!", duration: 3000, position: "top-right" })
      console.log(error)
      // this.router.navigate(['/login']);

    }
    );
  }


  deleteComment(id: any) {
    
    this.api.deleteComment(id).subscribe(data => {
      console.log(data);
      this.toast.success({ detail: "Comment successfully!", duration: 3000, position: "top-right" })
     
      this.commentForm.reset()
    }, error => {
      this.commentForm.reset()
      this.toast.error({ detail: "Comment failed!", duration: 3000, position: "top-right" })
      console.log(error)
      // this.router.navigate(['/login']);

    }
    );
  }

   

}

