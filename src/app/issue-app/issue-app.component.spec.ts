import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAppComponent } from './issue-app.component';

describe('IssueAppComponent', () => {
  let component: IssueAppComponent;
  let fixture: ComponentFixture<IssueAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
