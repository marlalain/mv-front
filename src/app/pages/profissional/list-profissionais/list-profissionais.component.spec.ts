import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfissionaisComponent } from './list-profissionais.component';

describe('ListProfissionaisComponent', () => {
  let component: ListProfissionaisComponent;
  let fixture: ComponentFixture<ListProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProfissionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
