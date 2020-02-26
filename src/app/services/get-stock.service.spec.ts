import { TestBed } from '@angular/core/testing';

import { GetStockService } from './get-stock.service';

describe('GetStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStockService = TestBed.get(GetStockService);
    expect(service).toBeTruthy();
  });
});
