import { TestBed } from '@angular/core/testing';

import { ListeBlogsService } from './liste-blogs.service';

describe('ListeBlogsService', () => {
  let service: ListeBlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeBlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
