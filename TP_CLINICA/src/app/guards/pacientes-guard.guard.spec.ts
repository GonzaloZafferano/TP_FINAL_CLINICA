import { TestBed } from '@angular/core/testing';

import { PacientesGuardGuard } from './pacientes-guard.guard';

describe('PacientesGuardGuard', () => {
  let guard: PacientesGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacientesGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
