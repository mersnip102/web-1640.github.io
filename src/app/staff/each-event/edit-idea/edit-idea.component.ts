import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.css']
})
export class EditIdeaComponent {
  ngListCategory = ["Category 1", "Category 2", "Category3"];
  categories: any[] = [];
  isCheckedTerms: boolean = false;

  isCheckedIncognito: boolean = false;

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
  idea!: any

  createIdeaForm!: FormGroup;
  fileContent?: string;

  constructor(
    public config: DynamicDialogConfig,
    public dialog: MatDialog, private api: ApiService, private router: Router, private sanitizer: DomSanitizer,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) { }

  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
  ngOptionrole = ["Admin", "QAM", "QAC", "Staff"];
  public aElement?: boolean = true;


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


  }

  getlistCategory() {
    this.api.getCategory().subscribe((res: any) => {

      console.log(res)
      this.categories = res.data.list
    })


  }

  getEvent() {
    this.api.getEvents().subscribe((res: any) => {
      const data = JSON.parse(res);
      // console.log(res.data.list[0].id);


      this.event = data.data.list.find((event: any) => event.id == this.route.snapshot.params['id'])
      // console.log(this.event)


    })

  }

  editAnIdea(data: any) {
    
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

        formData.append('content', this.createIdeaForm.get('content')!.value?.toString());
       
        formData.append('title', this.createIdeaForm.get('title')!.value);
        formData.append('anonymous', this.createIdeaForm.get('anonymous')!.value);
       

       

     
        this.api.editIdea(this.idea.id, formData
        ).subscribe(res => {
          console.log(res)
          const id = this.route.snapshot.params['id'];
          this.router.navigateByUrl('/staff', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/staff/newidea', id]).then(() => {
              this.toast.success({ detail: "Edit idea successfully!", duration: 3000, position: "top-right" })
            })
          })

          this.createIdeaForm.reset();
          // Swal.fire(
          //   'Added!',
          //   'Your idea has been added.',
          //   'success'
          // )



        }, error => {

          this.toast.error({ detail: "Add idea failed!", duration: 3000, position: "top-right" })
          console.log(error)
          // this.router.navigate(['/login']);
        }

        );

      }
    })
  }


  uploadedFiles: File[] = [];

  onSelect(event: any) {
    for (let file of event.files) {
      //check error
      if (file.size <= 5000000) {
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
    // // Truy cập đối tượng FileList của phần tử <p-fileUpload>
    // const fileList: FileList = event.fileInput.files;

    // // Lấy index của tệp tin bị xóa
    // const index = Array.prototype.indexOf.call(fileList, event.file);

    // // Loại bỏ tệp tin khỏi danh sách tệp tin đã chọn
    // this.uploadedFiles.splice(index, 1);
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
    console.log(this.uploadedFiles)



  }
  ngOnInit() {

    this.idea = this.config.data.idea;

    this.getlistCategory();

    this.getEvent();


    this.createIdeaForm = this.fb.group({
      files: new FormControl(null),
      title: new FormControl(this.idea.title, [Validators.required, Validators.minLength(3)]),
      content: new FormControl(this.idea.content, [Validators.required, Validators.minLength(3)]),
      anonymous: new FormControl(this.idea.anonymous)
      // files: new FormControl(null, [Validators.required]),

    })

    if (this.uploadedFiles && this.createIdeaForm.value.isCheckedTerms == false) {

      this.createIdeaForm.get('isCheckedTerms')?.setErrors({ incorrect: true });
    } else {
      this.createIdeaForm.get('isCheckedTerms')?.setErrors(null);
    }



  }
}


