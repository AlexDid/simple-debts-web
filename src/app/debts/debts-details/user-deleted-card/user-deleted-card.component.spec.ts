import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeletedCardComponent } from './user-deleted-card.component';

describe('UserDeletedCardComponent', () => {
  let component: UserDeletedCardComponent;
  let fixture: ComponentFixture<UserDeletedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeletedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeletedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
