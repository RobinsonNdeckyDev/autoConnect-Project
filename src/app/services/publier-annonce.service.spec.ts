import { TestBed } from '@angular/core/testing';

import { PublierAnnonceService } from './publier-annonce.service';

describe('PublierAnnonceService', () => {
  let service: PublierAnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublierAnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
