

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { DataGeneratorFNComponent } from './data-generator-fn/data-generator-fn.component';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { DataGeneratorFnFinanceComponent } from './data-generator-fn-finance/data-generator-fn-finance.component';
import { BootstrapModalComponent } from './bootstrap-modal/bootstrap-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DataGeneratorProdComponent } from './data-generator-prod/data-generator-prod.component';
// import { DataPreviewDialogProdComponent } from './data-preview-dialog-prod/data-preview-dialog-prod.component';
// import { DataGeneratorProdISCComponent } from './data-generator-prod-isc/data-generator-prod-isc.component';
// import { DataGeneratorProdBRISIMComponent } from './data-generator-prod-brisim/data-generator-prod-brisim.component';
// import { DataGeneratorProdHRDComponent } from './data-generator-prod-hrd/data-generator-prod-hrd.component';
// import { DataPreviewDialogProdIscComponent } from './data-preview-dialog-prod-isc/data-preview-dialog-prod-isc.component';
// import { DataPreviewDialogProdBrisimComponent } from './data-preview-dialog-prod-brisim/data-preview-dialog-prod-brisim.component';
// import { DataPreviewDialogProdHrdComponent } from './data-preview-dialog-prod-hrd/data-preview-dialog-prod-hrd.component';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { CFormCheckComponent } from './shared/c-form-check/c-form-check.component';

@NgModule({
  declarations: [
    AppComponent,
    DataGeneratorFNComponent,
    PreviewDialogComponent,
    HomeComponent,
    DataGeneratorFnFinanceComponent,
    BootstrapModalComponent
    // DataGeneratorProdComponent,
    // DataPreviewDialogProdComponent,
    // DataGeneratorProdISCComponent,
    // DataGeneratorProdBRISIMComponent,
    // DataGeneratorProdHRDComponent,
    // DataPreviewDialogProdIscComponent,
    // DataPreviewDialogProdBrisimComponent,
    // DataPreviewDialogProdHrdComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    ModalModule.forRoot(),
    // CFormCheckComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class AppModule { }



