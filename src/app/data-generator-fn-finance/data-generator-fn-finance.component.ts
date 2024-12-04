import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
// import { UserService } from '../user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import 'bootstrap';
import {  ElementRef, ViewChild } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

export interface User {
  [key: string]: string | undefined;
}

declare var bootstrap: any; // Declare Bootstrap as any

export type ChecklistKey = string;

type ForkJoinResult = [User[], ...Array<{ index: number; data: User[]; column: string; }>];
export type EncryptionType = "PlainText" | "Masking" | "Encryption";

@Component({
  selector: 'app-data-generator-fn-finance',
  templateUrl: './data-generator-fn-finance.component.html',
  styleUrls: ['./data-generator-fn-finance.component.css']
})

export class DataGeneratorFnFinanceComponent implements OnInit {
  @ViewChild('successModal') successModal: ElementRef | undefined;
  encryptionTypes: EncryptionType[] = ["PlainText", "Masking", "Encryption"];
  customPhoneNumber: string = '';
  fromValue: number = 1;
  toValue: number = 1000000;
  stepValue: number = 1;
  selectedFormat: string = 'csv';
  phoneFormat: string[] = [];
  noRekFormat: string[]=[];
  balanceFormat: string[]=[];
amountFormat: string[]=[];
  customAmount: string = '';
customAmounts: string = '';// Custom amount input
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
loading = false;
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
  private router: Router,
  private http: HttpClient,
  public dialog: MatDialog,
  private snackBar: MatSnackBar,
  private fb: FormBuilder,
  private dataService: DataService,
  private modalService: BsModalService
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

loadFields() {
  this.dataService.getFieldsF().subscribe((data: string[]) => {
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

showModal() {
  if (this.successModal) {
      bootstrap.Modal.getOrCreateInstance(this.successModal.nativeElement).show();
  }
}

// Function to hide the modal
hideSuccessModal() {
  if (this.successModal) {
      bootstrap.Modal.getOrCreateInstance(this.successModal.nativeElement).hide();
  }
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

// Fungsi generateCSV() yang telah dimodifikasi
generateCSV() {
  const selectedColumns = this.selectedColumns.slice();

  // Validasi untuk memastikan rowCount dan fileName diisi
  if (this.rowCount === null || this.rowCount <= 0) {
      this.snackBar.open('Pastikan untuk memasukkan limit yang valid (lebih dari 0).', 'Tutup', { duration: 3000 });
      return;
  }

  if (!this.fileName) {
      this.snackBar.open('Nama file harus diisi.', 'Tutup', { duration: 3000 });
      return;
  }

  // Validasi untuk memastikan kolom yang diperlukan diisi
  if (selectedColumns.length === 0) {
      this.snackBar.open('Pilih setidaknya satu kolom untuk dibuat', 'Tutup', { duration: 3000 });
      return;
  }

  const confirmDownload = window.confirm('Apakah Anda yakin ingin menghasilkan data?');
  if (confirmDownload) {
      this.loading = true;

      // Pastikan rowCount adalah number
      const rowCountValue = this.rowCount || 0;

      const requests = selectedColumns.map((column, index) =>
          this.dataService.getDataByEncryptionTypeF(this.encryptionTypes[index], rowCountValue).pipe(
              map(data => ({ data, column }))
          )
      );

      forkJoin(requests).subscribe(results => {
          console.log('Hasil dari semua permintaan:', results);

          const allData = this.mergeResults(results);
          console.log('Data yang digabung:', allData);

          const csvData = this.convertToCSV(allData, selectedColumns);
          this.downloadCSV(csvData, this.fileName);

          this.loading = false;
      }, error => {
          console.error('Error fetching data:', error);
          this.loading = false;
          this.snackBar.open(`Terjadi kesalahan: ${error.message}`, 'Tutup', { duration: 3000 });
      });
  }
}

// Fungsi untuk menggabungkan hasil dari permintaan menjadi satu array
mergeResults(results: { data: any[]; column: string }[]): { [key: string]: any }[] {
const combinedData: { [key: string]: any } = {};
const rowCount = this.rowCount !== null ? this.rowCount : 0;

// Buat objek untuk menyimpan data
for (let i = 0; i < rowCount; i++) {
    combinedData[i] = {}; // Inisialisasi objek untuk setiap baris
}

results.forEach(result => {
    result.data.forEach((item, index) => {
        if (combinedData[index]) {
            // Tambahkan item ke combinedData hanya jika index valid
            combinedData[index][result.column] = item[result.column];
        }
    });
});

// Mengonversi objek menjadi array
return Object.values(combinedData);
}

// Fungsi untuk mengunduh CSV
downloadCSV(csvData: string, fileName: string) {
const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = fileName; // Gunakan nama file dari input
a.click();
window.URL.revokeObjectURL(url);
this.snackBar.open('Data berhasil dihasilkan', 'Tutup', { duration: 3000 });
}

// Fungsi untuk mengonversi data menjadi CSV
convertToCSV(data: { [key: string]: any }[], columns: string[]): string {
const csvRows: string[] = [];

// Menambahkan header
csvRows.push(columns.join(','));

// Menambahkan setiap baris data
for (const row of data) {
    const values = columns.map(column => {
        // Memastikan nilai bukan undefined atau null
        const value = row[column];
        return value !== undefined && value !== null ? JSON.stringify(value) : ''; // Menggunakan JSON.stringify untuk mengonversi objek menjadi string
    });
    csvRows.push(values.join(','));
}

return csvRows.join('\n'); // Gabungkan semua baris menjadi string dengan baris baru
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
    return this.dataService.getDataByEncryptionTypeF(this.encryptionTypes[index], previewRowCount).pipe(
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
    'NIK': 'account',
    'nama akun': 'accountName',
    'mask': 'mask',
    'amount': 'amount',
    'bic': 'bic',
    'mata uang': 'currencyName'
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
