import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionEmpleadoDialogComponent } from './evaluacion-empleado-dialog.component';

describe('EvaluacionEmpleadoDialogComponent', () => {
  let component: EvaluacionEmpleadoDialogComponent;
  let fixture: ComponentFixture<EvaluacionEmpleadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionEmpleadoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionEmpleadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
