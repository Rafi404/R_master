import { TestBed } from '@angular/core/testing';

import { SupplierAddService } from './supplier_add.service';

describe('SupplierAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierAddService = TestBed.get(SupplierAddService);
    expect(service).toBeTruthy();
  });
});
