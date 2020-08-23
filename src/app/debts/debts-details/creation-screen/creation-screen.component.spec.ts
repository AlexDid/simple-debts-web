import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationScreenComponent } from './creation-screen.component';

describe('CreationScreenComponent', () => {
  let component: CreationScreenComponent;
  let fixture: ComponentFixture<CreationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
