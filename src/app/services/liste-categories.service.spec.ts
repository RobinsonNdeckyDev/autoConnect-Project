import { TestBed } from '@angular/core/testing';

import { ListeCategoriesService } from './liste-categories.service';

describe('ListeCategoriesService', () => {
  let service: ListeCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
