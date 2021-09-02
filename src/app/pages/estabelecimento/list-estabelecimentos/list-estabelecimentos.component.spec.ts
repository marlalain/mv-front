import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstabelecimentosComponent } from './list-estabelecimentos.component';

describe('ListEstabelecimentosComponent', () => {
  let component: ListEstabelecimentosComponent;
  let fixture: ComponentFixture<ListEstabelecimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEstabelecimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstabelecimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
