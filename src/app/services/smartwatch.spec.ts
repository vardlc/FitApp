import { TestBed } from '@angular/core/testing';

import { SmartwatchService } from './smartwatch';

describe('Smartwatch', () => {
  let service: SmartwatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartwatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
