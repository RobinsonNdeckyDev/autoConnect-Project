import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminGuard } from './admin-guard.guard';

describe('adminGuardGuard', () => {

  let guard: AdminGuard;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
