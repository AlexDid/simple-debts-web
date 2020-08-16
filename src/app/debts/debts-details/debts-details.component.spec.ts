import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsDetailsComponent } from './debts-details.component';

describe('DebtsDetailsComponent', () => {
  let component: DebtsDetailsComponent;
  let fixture: ComponentFixture<DebtsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
