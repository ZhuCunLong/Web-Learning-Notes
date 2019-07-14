import { TestBed } from '@angular/core/testing';

import { SummaryService } from './summary.service';

describe('SummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryService = TestBed.get(SummaryService);
    expect(service).toBeTruthy();
  });
});
