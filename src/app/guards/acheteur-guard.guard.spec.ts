import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AcheteurGuard } from './acheteur-guard.guard';


describe('acheteurGuardGuard', () => {
  let guard: AcheteurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AcheteurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
