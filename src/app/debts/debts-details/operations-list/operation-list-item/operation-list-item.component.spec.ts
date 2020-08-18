import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationListItemComponent } from './operation-list-item.component';

describe('OperationListItemComponent', () => {
  let component: OperationListItemComponent;
  let fixture: ComponentFixture<OperationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
