import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionEmpleadoComponent } from './evaluacion-empleado.component';

describe('EvaluacionEmpleadoComponent', () => {
  let component: EvaluacionEmpleadoComponent;
  let fixture: ComponentFixture<EvaluacionEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
