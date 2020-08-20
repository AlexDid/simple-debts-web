import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualUserFormComponent } from './virtual-user-form.component';

describe('VirtualUserFormComponent', () => {
  let component: VirtualUserFormComponent;
  let fixture: ComponentFixture<VirtualUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
