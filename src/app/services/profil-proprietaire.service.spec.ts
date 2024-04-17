import { TestBed } from '@angular/core/testing';

import { ProfilProprietaireService } from './profil-proprietaire.service';

describe('ProfilProprietaireService', () => {
  let service: ProfilProprietaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilProprietaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
