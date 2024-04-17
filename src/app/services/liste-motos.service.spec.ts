import { TestBed } from '@angular/core/testing';

import { ListeMotosService } from './liste-motos.service';

describe('ListeMotosService', () => {
  let service: ListeMotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeMotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
