import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfissionalComponent } from './edit-profissional.component';

describe('EditProfissionalComponent', () => {
  let component: EditProfissionalComponent;
  let fixture: ComponentFixture<EditProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfissionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
