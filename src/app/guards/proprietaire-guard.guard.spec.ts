import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ProprietaireGard } from './proprietaire-guard.guard';

describe('proprietaireGuardGuard', () => {
  let guard: ProprietaireGard;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProprietaireGard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
