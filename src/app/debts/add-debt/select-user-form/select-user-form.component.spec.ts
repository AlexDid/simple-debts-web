import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserFormComponent } from './select-user-form.component';

describe('SelectUserFormComponent', () => {
  let component: SelectUserFormComponent;
  let fixture: ComponentFixture<SelectUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
