import { TestBed } from '@angular/core/testing';

import { PdfShowcaseService } from './pdf-showcase.service';

describe('PdfShowcaseService', () => {
  let service: PdfShowcaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfShowcaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
