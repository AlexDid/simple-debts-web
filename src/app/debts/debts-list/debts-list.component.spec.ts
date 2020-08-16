import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsListComponent } from './debts-list.component';

describe('DebtsListComponent', () => {
  let component: DebtsListComponent;
  let fixture: ComponentFixture<DebtsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
