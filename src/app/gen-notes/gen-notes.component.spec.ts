import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenNotesComponent } from './gen-notes.component';

describe('GenNotesComponent', () => {
  let component: GenNotesComponent;
  let fixture: ComponentFixture<GenNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
