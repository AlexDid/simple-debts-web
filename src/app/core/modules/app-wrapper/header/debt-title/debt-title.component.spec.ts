import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtTitleComponent } from './debt-title.component';

describe('DebtTitleComponent', () => {
  let component: DebtTitleComponent;
  let fixture: ComponentFixture<DebtTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
