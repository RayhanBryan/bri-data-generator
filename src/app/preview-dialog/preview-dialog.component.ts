// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-preview-dialog',
//   templateUrl: './preview-dialog.component.html',
//   styleUrls: ['./preview-dialog.component.css']
// })
// export class PreviewDialogComponent {

// }



import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User, ChecklistKey } from '../data-generator-fn/data-generator-fn.component'; // Pastikan import User dan ChecklistKey dari data-generator.component
// import * as bootstrap from 'bootstrap';
// import * as $ from 'jquery';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.css']
})
export class PreviewDialogComponent implements OnInit {
  checklist: Record<string, boolean> = {};
  users: User[] = [];
  selectedColumns: ChecklistKey[] = [];
  customFields: string[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    if (this.bsModalRef && this.bsModalRef.content) {
      const initialState = this.bsModalRef.content;
      this.checklist = initialState.checklist || {};
      this.customFields = initialState.customFields || [];
      this.selectedColumns = initialState.selectedColumns || [];
      this.users = initialState.users.map((user: User) => {
        const reorderedUser: any = {};
        this.selectedColumns.forEach((column: ChecklistKey) => {
          reorderedUser[column] = user[column];
        });
        return reorderedUser;
      }) || [];
    }
  }

  hideModal(): void {
    this.bsModalRef.hide();
  }
}

// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { User, ChecklistKey } from '../data-generator/data-generator.component'; // Pastikan import User dan ChecklistKey dari data-generator.component

// @Component({
//   selector: 'app-data-preview-dialog',
//   templateUrl: './data-preview-dialog.component.html',
//   styleUrls: ['./data-preview-dialog.component.css']
// })
// export class DataPreviewDialogComponent implements OnInit {
//   checklist: Record<string, boolean> = {};
//   users: User[] = [];
//   selectedColumns: ChecklistKey[] = [];
//   customFields: string[] = [];

//   constructor(
//     public dialogRef: MatDialogRef<DataPreviewDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.checklist = data.checklist || {};
//     this.customFields = data.customFields || [];
//     this.selectedColumns = data.selectedColumns || [];
//     this.users = data.users.map((user: User) => {
//       const reorderedUser: any = {};
//       this.selectedColumns.forEach((column: ChecklistKey) => {
//         reorderedUser[column] = user[column];
//       });
//       return reorderedUser;
//     }) || [];
//   }

//   ngOnInit(): void {}

//   onClose(): void {
//     this.dialogRef.close();
//   }
// }

