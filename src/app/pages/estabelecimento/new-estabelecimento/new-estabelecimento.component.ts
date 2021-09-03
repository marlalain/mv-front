import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-new-estabelecimento',
  templateUrl: './new-estabelecimento.component.html',
  styleUrls: ['./new-estabelecimento.component.scss'],
})
export class NewEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  estabelecimentoForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private service: EstabelecimentoService,
    private toastUtil: ToastUtilService
  ) {
    this.loading = true;
    this.estabelecimento = new Estabelecimento();
    this.estabelecimentoForm = new FormGroup({
      nome: new FormControl(''),
      telefone: new FormControl(''),
      rua: new FormControl(''),
      bairro: new FormControl(''),
      numero: new FormControl(''),
    });
  }

  onSubmit() {
    let estabelecimento: Estabelecimento = this.estabelecimentoForm.value;
    estabelecimento.endereco = {
      rua: this.estabelecimentoForm.value.rua,
      bairro: this.estabelecimentoForm.value.bairro,
      numero: this.estabelecimentoForm.value.numero,
    };
    this.service.createEstabelecimento(estabelecimento).subscribe(
      () => {
        this.toastUtil.showSuccess(
          'Sucesso',
          'Estabelecimento criado com sucesso.'
        );
        this.goBack();
      },
      (err) => {
        this.toastUtil.showError(err);
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('estabelecimentos');
  }

  ngOnInit(): void {}
}
