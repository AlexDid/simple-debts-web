import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideButtonComponent } from './outside-button.component';

describe('OutsideButtonComponent', () => {
  let component: OutsideButtonComponent;
  let fixture: ComponentFixture<OutsideButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsideButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
