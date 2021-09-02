import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstabelecimentoComponent } from './edit-estabelecimento.component';

describe('EditEstabelecimentoComponent', () => {
  let component: EditEstabelecimentoComponent;
  let fixture: ComponentFixture<EditEstabelecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEstabelecimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
