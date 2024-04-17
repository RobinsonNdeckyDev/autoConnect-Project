
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
















// import { TestBed } from '@angular/core/testing';
// import { CanActivateFn } from '@angular/router';

// import { authGuard } from './auth.guard';

// describe('authGuard', () => {
//   const executeGuard: CanActivateFn = (...guardParameters) => 
//       TestBed.runInInjectionContext(() => authGuard(...guardParameters));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(executeGuard).toBeTruthy();
//   });
// });
