import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGeneratorFnFinanceComponent } from './data-generator-fn-finance.component';

describe('DataGeneratorFnFinanceComponent', () => {
  let component: DataGeneratorFnFinanceComponent;
  let fixture: ComponentFixture<DataGeneratorFnFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGeneratorFnFinanceComponent]
    });
    fixture = TestBed.createComponent(DataGeneratorFnFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
