import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationApproveComponent } from './transportation-approve.component';

describe('TransportationApproveComponent', () => {
  let component: TransportationApproveComponent;
  let fixture: ComponentFixture<TransportationApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
