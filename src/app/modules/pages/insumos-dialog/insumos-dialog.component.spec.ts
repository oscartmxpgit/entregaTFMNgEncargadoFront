import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosDialogComponent } from './insumos-dialog.component';

describe('InsumosDialogComponent', () => {
  let component: InsumosDialogComponent;
  let fixture: ComponentFixture<InsumosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
