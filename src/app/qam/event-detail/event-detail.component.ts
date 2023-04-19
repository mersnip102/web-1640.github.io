import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})

export class EventDetailComponent implements OnInit {
  document!: any
  eventData!: any
  imageURL!: string;
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private api: ApiService,
    private router: Router, private route: ActivatedRoute, private toast: NgToastService) { }

ngOnInit(): void {
  this.getDocumentById();

}

getDocumentById():
  void {
    //get param
    const id = this.route.snapshot.params['id'];
    this.api.getDocumentById(id).subscribe((res: any) => {
      
      console.log(res.data);
      this.document = res.data;
    })
  }


  public downloadFileAndDisplayImage(url: string): void {
    const file = this.document.idea.files[0];
    
      const fileExtension = url.split('.').pop();
      if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
        const imgSrc = URL.createObjectURL(file);
        this.imageURL = imgSrc;
        // const img = document.createElement('img');
        // img.src = imgSrc;
        // document.body.appendChild(img);
      } else {
        // const downloadLink = document.createElement('a');
        // const fileUrl = URL.createObjectURL(response);
        // downloadLink.href = fileUrl;
        // downloadLink.download = `file.${fileExtension}`;
        // document.body.appendChild(downloadLink);
        // downloadLink.click();

        const fileExtension = url.split('.').pop();
        const fileName = `file.${fileExtension}`;
        saveAs(file, fileName);
      }
    
  }

  isImage(file: string): boolean {
    return /\.(jpe?g|png|gif)$/i.test(file);
  }

  // encodeURI(data: string): any {
  //   const data2 =encodeURIComponent(data)
  //   console.log(data);
  //   return data2
  // }

  dowload(link: any): any {
    console.log(link);
    const data: any = this.sanitizer.bypassSecurityTrustUrl(link);
    //  const data =encodeURIComponent(link)
    console.log(data);
    return data
  }




  
}



