import { TestBed } from '@angular/core/testing';

import { ShirtsSaleService } from './shirts-sale.service';

describe('ShirtsSaleService', () => {
  let service: ShirtsSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShirtsSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
