import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEstabelecimentoComponent } from './new-estabelecimento.component';

describe('NewEstabelecimentoComponent', () => {
  let component: NewEstabelecimentoComponent;
  let fixture: ComponentFixture<NewEstabelecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEstabelecimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
