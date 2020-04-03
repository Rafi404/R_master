import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationApprovalComponent } from './transportation-approval.component';

describe('TransportationApprovalComponent', () => {
  let component: TransportationApprovalComponent;
  let fixture: ComponentFixture<TransportationApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
