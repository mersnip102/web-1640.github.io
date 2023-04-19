import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog-component.component.html',
})
export class SuccessDialogComponentComponent {

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onClose(): void {
    this.dialogRef.close();
  }
  

}
