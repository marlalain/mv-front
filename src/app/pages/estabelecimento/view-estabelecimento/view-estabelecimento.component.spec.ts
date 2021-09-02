import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEstabelecimentoComponent } from './view-estabelecimento.component';

describe('ViewEstabelecimentoComponent', () => {
  let component: ViewEstabelecimentoComponent;
  let fixture: ComponentFixture<ViewEstabelecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEstabelecimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
