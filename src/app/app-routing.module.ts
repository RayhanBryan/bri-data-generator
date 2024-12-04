// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataGeneratorFNComponent } from './data-generator-fn/data-generator-fn.component';
import { DataGeneratorFnFinanceComponent } from './data-generator-fn-finance/data-generator-fn-finance.component';
// import { DataGeneratorProdComponent } from './data-generator-prod/data-generator-prod.component';
// import { DataGeneratorProdBRISIMComponent } from './data-generator-prod-brisim/data-generator-prod-brisim.component';
// import { DataGeneratorProdHRDComponent } from './data-generator-prod-hrd/data-generator-prod-hrd.component';
// import { DataGeneratorProdISCComponent } from './data-generator-prod-isc/data-generator-prod-isc.component';

const routes: Routes = [
  { path: '', redirectTo: '/data-generator', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'data-generator', component: DataGeneratorFNComponent },
  { path: 'data-generator-finance', component: DataGeneratorFnFinanceComponent },
  // { path: 'data-generator-prod-brisim', component: DataGeneratorProdBRISIMComponent },
  // { path: 'data-generator-prod-isc', component: DataGeneratorProdISCComponent },
  // { path: 'data-generator-prod-hrd', component: DataGeneratorProdHRDComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
