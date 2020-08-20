import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtTypeFormComponent } from './debt-type-form.component';

describe('DebtTypeFormComponent', () => {
  let component: DebtTypeFormComponent;
  let fixture: ComponentFixture<DebtTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
