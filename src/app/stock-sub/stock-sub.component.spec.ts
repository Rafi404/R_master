import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSubComponent } from './stock-sub.component';

describe('StockSubComponent', () => {
  let component: StockSubComponent;
  let fixture: ComponentFixture<StockSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
