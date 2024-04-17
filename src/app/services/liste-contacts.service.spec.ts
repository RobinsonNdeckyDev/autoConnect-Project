import { TestBed } from '@angular/core/testing';

import { ListeContactsService } from './liste-contacts.service';

describe('ListeContactsService', () => {
  let service: ListeContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
