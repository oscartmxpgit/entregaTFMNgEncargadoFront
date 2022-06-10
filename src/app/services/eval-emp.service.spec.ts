import { TestBed } from '@angular/core/testing';

import { EvalEmpService } from './eval-emp.service';

describe('EvalEmpService', () => {
  let service: EvalEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
