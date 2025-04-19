import { TestBed } from '@angular/core/testing';

import { GenreCategoryService } from './genre-category.service';

describe('GenreCategoryService', () => {
  let service: GenreCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
