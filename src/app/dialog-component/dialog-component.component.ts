import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  template: `
    <div class="modal-container">
      <img [src]="imgSrc" (click)="closeDialog()">
    </div>
  `,
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent {
  imgSrc?: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imgSrc = data.imgSrc;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
