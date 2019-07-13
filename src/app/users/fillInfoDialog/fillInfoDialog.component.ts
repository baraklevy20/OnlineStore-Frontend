import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fillInfoDialog',
  templateUrl: './fillInfoDialog.component.html',
  styleUrls: ['./fillInfoDialog.component.css']
})
export class FillInfoDialogComponent implements OnInit {
  fillUserInfoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FillInfoDialogComponent>) { }

  ngOnInit() {
    // Create the form group with validation
    this.fillUserInfoForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      address: new FormControl('', [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDataFromForm() {
    // Convert the form data to a userInfo object
    return {
      username: this.fillUserInfoForm.controls['username'].value,
      address: this.fillUserInfoForm.controls['address'].value
    } as UserInfo;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.fillUserInfoForm.controls[controlName].hasError(errorName);
  }
}
