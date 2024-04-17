import { TestBed } from '@angular/core/testing';

import { ListeNewslettersService } from './liste-newsletters.service';

describe('ListeNewslettersService', () => {
  let service: ListeNewslettersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeNewslettersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
