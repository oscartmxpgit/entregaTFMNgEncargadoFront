import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesadialogComponent } from './mesadialog.component';

describe('MesadialogComponent', () => {
  let component: MesadialogComponent;
  let fixture: ComponentFixture<MesadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
