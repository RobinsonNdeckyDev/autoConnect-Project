import { TestBed } from '@angular/core/testing';

import { ListeUtilitairesService } from './liste-utilitaires.service';

describe('ListeUtilitairesService', () => {
  let service: ListeUtilitairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeUtilitairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
