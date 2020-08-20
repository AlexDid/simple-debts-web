import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmScreenComponent } from './confirm-screen.component';

describe('ConfirmScreenComponent', () => {
  let component: ConfirmScreenComponent;
  let fixture: ComponentFixture<ConfirmScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
