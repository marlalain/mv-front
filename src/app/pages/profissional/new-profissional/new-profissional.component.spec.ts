import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfissionalComponent } from './new-profissional.component';

describe('NewProfissionalComponent', () => {
  let component: NewProfissionalComponent;
  let fixture: ComponentFixture<NewProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfissionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
