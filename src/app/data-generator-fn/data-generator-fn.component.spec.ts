import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGeneratorFNComponent } from './data-generator-fn.component';

describe('DataGeneratorFNComponent', () => {
  let component: DataGeneratorFNComponent;
  let fixture: ComponentFixture<DataGeneratorFNComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGeneratorFNComponent]
    });
    fixture = TestBed.createComponent(DataGeneratorFNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
