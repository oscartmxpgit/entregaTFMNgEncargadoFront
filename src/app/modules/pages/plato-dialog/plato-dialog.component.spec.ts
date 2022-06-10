import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoDialogComponent } from './plato-dialog.component';

describe('PlatoDialogComponent', () => {
  let component: PlatoDialogComponent;
  let fixture: ComponentFixture<PlatoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
