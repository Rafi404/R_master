import { TestBed } from '@angular/core/testing';

import { ItemAddService } from './item_add.service';

describe('ItemAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemAddService = TestBed.get(ItemAddService);
    expect(service).toBeTruthy();
  });
});
