import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-individual-country-dialog',
  templateUrl: './individual-country-dialog.component.html',
  styleUrls: ['./individual-country-dialog.component.scss']
})
export class IndividualCountryDialogComponent implements OnInit {

  constructor(protected dialogRef: MatDialogRef<IndividualCountryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }

}
