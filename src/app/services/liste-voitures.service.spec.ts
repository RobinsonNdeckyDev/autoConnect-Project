import { TestBed } from '@angular/core/testing';

import { ListeVoituresService } from './liste-voitures.service';

describe('ListeVoituresService', () => {
  let service: ListeVoituresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeVoituresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
