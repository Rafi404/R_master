import { TestBed } from '@angular/core/testing';

import { StockAddService } from './stock-add.service';

describe('StockAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockAddService = TestBed.get(StockAddService);
    expect(service).toBeTruthy();
  });
});
