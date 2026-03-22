import { TestBed } from '@angular/core/testing';

import { EjerciciosAPI } from './ejercicios-api';

describe('EjerciciosAPI', () => {
  let service: EjerciciosAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjerciciosAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
