import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import 'bootstrap';
import {  ElementRef, ViewChild } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BootstrapModalComponent } from '../bootstrap-modal/bootstrap-modal.component';
import * as bootstrap from 'bootstrap';

export interface User {
  [key: string]: string | undefined;
}
// declare const bootstrap: any;
// declare var bootstrap: any; // Declare Bootstrap as any

export type ChecklistKey = string;

type ForkJoinResult = [User[], ...Array<{ index: number; data: User[]; column: string; }>];
export type EncryptionType = "PlainText" | "Masking" | "Encryption";

@Component({
  selector: 'app-data-generator-fn',
  templateUrl: './data-generator-fn.component.html',
  styleUrls: ['./data-generator-fn.component.css'],
})

export class DataGeneratorFNComponent implements OnInit, AfterViewInit {
  @ViewChild('confirmationModal', { static: false }) confirmationModal!: ElementRef;
  @ViewChild('messageModal', { static: false }) messageModal!: ElementRef;

  modalTitle: string = '';
  modalMessage: string = '';
  private confirmationModalInstance: any;
  private messageModalInstance: any;
  loading = false;
    encryptionTypes: EncryptionType[] = ["PlainText", "Masking", "Encryption"];
    customPhoneNumber: string = '';
    fromValue: number = 1;
    toValue: number = 1000000;
    stepValue: number = 1;
    selectedFormat: string = 'csv';
    phoneFormat: string[] = [];
    noRekFormat: string[]=[];
    balanceFormat: string[]=[];
    customAmount: string = ''; // Custom amount input
customNoRekening: string = '';
    // phoneFormat: number[] = [];
    rekFormat: string[] = [];
    amountCount: number[] = [];
  bsModalRef?: BsModalRef;
  typeData: string[] = [];
  lengthData: number[] = [];
  users: User[] = [];
  checklist: Record<string, string> = {};
  rowCount: number | null = null;
  downloadMessage: string | null = null;
  errorMessage: string | null = null;
  form: FormGroup;
  // loading = false;
  fields: any[] = [];
  insertFields: string[] = [];
  selectedColumns: string[] = [];
  fieldTypes: Record<string, string> = {};
  dynamicFieldIndexes: number[] = [];
  newFieldName: string = '';
  newFieldType: string = '';
  // encryptionTypes: string[] = [];
  // previewData: any[] = [];
  previewData: { [key: string]: any }[] = [];
  fileName: string = 'customers_data.csv';  // Example default value
  customFields: any[] = [];

  constructor(
    // private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dataService: DataService,
    private modalService: NgbModal
  ) {
    this.form = this.fb.group({
      agree: [false, Validators.requiredTrue],
    });
  }




  ngOnInit() {
     this.loadFields();
    this.initializeDefaultFields();

    this.fieldTypes = {
      'NIK': 'id',
      'email': 'email',
      'nama cus': 'customer_name',
      'no rekening': 'account_number',
      'alamat': 'address'

    };
    this.encryptionTypes = this.insertFields.map(() => 'PlainText');
  }

  ngAfterViewInit(): void {
    // Ensure jQuery is loaded (Bootstrap 3 relies on jQuery)
    if (typeof $ !== 'undefined') {
      if (this.confirmationModal) {
        this.confirmationModalInstance = $(this.confirmationModal.nativeElement);
      }
      if (this.messageModal) {
        this.messageModalInstance = $(this.messageModal.nativeElement);
      }
    }
  }

  //Show confirmation modal
  openConfirmationModal() {
    if (this.confirmationModalInstance) {
      this.confirmationModalInstance.show();
    }
  }

  closeConfirmationModal() {
    if (this.confirmationModalInstance) {
      this.confirmationModalInstance.hide();
    }
  }

  // General modal for messages
  showModal(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    if (this.messageModalInstance) {
      this.messageModalInstance.show();
    }
  }

  closeMessageModal() {
    if (this.messageModalInstance) {
      this.messageModalInstance.hide();
    }
  }
// }

  loadFields() {
    this.dataService.getFields().subscribe((data: string[]) => {
      console.log(data, data.length);
      if (data.length > 0) {
        this.fields = data;
        console.log(this.fields);
      }
    });
  }

  resetHalaman() {
    this.selectedColumns = [];     // Kosongkan tipe yang dipilih
    this.insertFields = [];  // Kosongkan fieldname yang dipilih
  }

  onClose() {
    this.previewData = []; // Mengosongkan data preview untuk menyembunyikan tabel
    // this.selectedColumns = []; // Jika perlu, kosongkan juga kolom yang ditampilkan
    }

  addField() {
    const defaultFieldName = 'NewField'; // Nama bidang default jika diperlukan
    const defaultFieldType = 'defaultType'; // Jenis bidang default jika diperlukan
    const newFieldName = defaultFieldName + (this.insertFields.length + 1); // Nama bidang baru dengan nomor urutan
    this.insertFields.push(newFieldName);
    this.checklist[newFieldName] = defaultFieldType; // Atur jenis bidang default atau sesuaikan logika Anda
    this.encryptionTypes.push('PlainText'); // Tambahkan nilai default untuk encryptionTypes

  }


hideNoFieldsModal() {
  ($('#noFieldsModal') as any).modal('hide');
}

removeField(fieldName: string) {
    const index = this.insertFields.indexOf(fieldName);
    if (index > -1) {
      this.insertFields.splice(index, 1);
      delete this.checklist[fieldName];
      this.selectedColumns.splice(index, 1);
      this.encryptionTypes.splice(index, 1);
      this.newFieldName = '';
      this.newFieldType = '';
    }
  }

  generateCSV1() {
    const headers = this.insertFields.slice();
    const selectedColumns = this.selectedColumns.slice();

    if (this.rowCount === null || this.rowCount <= 0) {
        this.showModal('Invalid Input', 'Pastikan untuk memasukkan limit yang valid (lebih dari 0).');
        return;
    }

    if (!this.fileName) {
        this.showModal('Missing Filename', 'Nama file harus diisi.');
        return;
    }

    if (selectedColumns.length === 0) {
        this.showModal('No Column Selected', 'Pilih setidaknya satu kolom untuk dibuat.');
        return;
    }

    this.openConfirmationModal();
  }

  // Show confirmation modal




  confirmAction() {
    this.closeConfirmationModal();
    this.loading = true;

    this.dataService.getDataByLimit(this.rowCount || 0).subscribe(
      (data: any[]) => {
          const csvData = this.convertToCSV(data, this.insertFields, this.selectedColumns);
          this.downloadCSV1(csvData, this.fileName);
          this.loading = false;
          this.showModal('Success', 'Data successfully generated and downloaded.');
      },
      error => {
          console.error('Error fetching data:', error);
          this.loading = false;
          this.showModal('Error', `Terjadi kesalahan: ${error.message}`);
      }
    );
  }

// Fungsi untuk mengonversi JSON ke CSV
convertToCSV(data: any[],headers: string[], columns: string[]): Blob {
  const csvRows: string[] = [];

  // Menambahkan header
  csvRows.push(headers.join(','));

  // Menambahkan setiap baris data
  data.forEach(row => {
      const values = columns.map(column => {
          const value = row[column];
          return value !== undefined && value !== null ? JSON.stringify(value) : '';
      });
      csvRows.push(values.join(','));
  });

  return new Blob([csvRows.join('\n')], { type: 'text/csv' });
}

// Fungsi untuk mengunduh CSV
downloadCSV1(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  this.snackBar.open('Data berhasil dihasilkan', 'Tutup', { duration: 3000 });
}

updateSelectedColumns(index: number) {
    const selectedColumn = this.selectedColumns[index];
    // Tambahkan nilai yang dipilih ke selectedColumns jika belum ada di sana
    if (!this.selectedColumns.includes(selectedColumn)) {
      this.selectedColumns.push(selectedColumn);
    }
  }

addDynamicField() {
    const newIndex = this.dynamicFieldIndexes.length;
    this.dynamicFieldIndexes.push(newIndex);
    this.selectedColumns[newIndex] = ''; // Pastikan setiap dropdown memiliki nilai awal yang sesuai
  }

trackByIndex(index: number, item: any): any {
  return index;
}

updateCustomField(value: string, index: number): void {
  this.insertFields[index] = value;
  this.insertFields = [...this.insertFields]; // Buat salinan baru untuk mencegah perubahan referensi yang tidak perlu
}

private formatPreviewData(results: Array<{ data: User[]; column: string }>): { [key: string]: any }[] {
  const combinedData: { [key: string]: any }[] = [];
  results.forEach(({ data, column }) => {
      data.forEach((user, rowIndex) => {
          if (!combinedData[rowIndex]) {
              combinedData[rowIndex] = {};
          }
          combinedData[rowIndex][column] = user[column] || '';
      });
  });
  return combinedData;
}

private generateFormattedPhoneNumber(format: string): string {
  return format.replace(/#/g, () => Math.floor(Math.random() * 10).toString());
}

private generateFormattedPhoneNumber1(format: string | undefined): string {
  // Check if format is undefined or empty
  if (!format) {
    console.warn('Phone format is undefined or empty, using default format');
    return '000-000-0000'; // Return a default value or handle this case as needed
  }
  return format.replace(/#/g, () => Math.floor(Math.random() * 10).toString());
}

openDataPreviewFix1() {
  const selectedColumns = this.selectedColumns.slice();
  if (!selectedColumns.length) {
      this.snackBar.open('Pilih setidaknya satu kolom untuk dilihat', 'Tutup', { duration: 3000 });
      return;
  }

  // Jika rowCount tidak diisi atau kurang dari 1, atur default ke 100
  const previewRowCount = this.rowCount && this.rowCount > 0 ? this.rowCount : 100;

  const requests = selectedColumns.map((column, index) => {
    // Menarik data dari service untuk setiap kolom
    return this.dataService.getDataByEncryptionType(this.encryptionTypes[index], previewRowCount).pipe(
      map(data => ({ data, column }))
    );
  });

  forkJoin(requests).subscribe(results => {
      this.previewData = this.formatPreviewData(results);
  });
}



confirmLogout() {
  const confirmed = confirm("Apakah Anda yakin untuk keluar?");

  if (confirmed) {
      this.router.navigate(['/home']);  // Ganti '/home' dengan rute yang sesuai untuk logout
  }
}

  convertChecklistToBoolean(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    Object.keys(this.checklist).forEach((key) => {
      result[key] = true;
    });
    return result;
  }

  checklistKeys(): string[] {
    return Object.keys(this.checklist);
  }

  private initializeDefaultFields() {
    const defaultFieldMappings: Record<string, string> = {
      'NIK': 'id',
      'No Telp': 'phoneNumber',
      'alamat': 'address',
      'amount': 'balance',
      'no rekening': 'accountNumber',
      'tanggal': 'dateOfBirth'
       };



    Object.keys(defaultFieldMappings).forEach((field) => {
      if (!this.checklist.hasOwnProperty(field)) {
        this.insertFields.push(field); // Add to customFields for display
        this.checklist[field] = defaultFieldMappings[field]; // Map to default field type
        this.selectedColumns.push(defaultFieldMappings[field]); // Initialize selectedColumns with default type
        this.encryptionTypes.push('PlainText'); // Inisialisasi encryptionTypes dengan nilai default
      }
    });

  }
}
