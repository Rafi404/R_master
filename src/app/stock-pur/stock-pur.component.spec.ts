import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPurComponent } from './stock-pur.component';

describe('StockPurComponent', () => {
  let component: StockPurComponent;
  let fixture: ComponentFixture<StockPurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
