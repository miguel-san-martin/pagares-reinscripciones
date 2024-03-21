import { TestBed } from '@angular/core/testing';

import { PagareReinscripcionesService } from './pagare-reinscripciones.service';

describe('PagareReinscripcionesService', () => {
  let service: PagareReinscripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagareReinscripcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
