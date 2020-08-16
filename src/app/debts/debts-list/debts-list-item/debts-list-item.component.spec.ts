import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsListItemComponent } from './debts-list-item.component';

describe('DebtsListItemComponent', () => {
  let component: DebtsListItemComponent;
  let fixture: ComponentFixture<DebtsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
