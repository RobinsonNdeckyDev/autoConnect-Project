import { TestBed } from '@angular/core/testing';

import { ListeUsersService } from './liste-users.service';

describe('ListeUsersService', () => {
  let service: ListeUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
