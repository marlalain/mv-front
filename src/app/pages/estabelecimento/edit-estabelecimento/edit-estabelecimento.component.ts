import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-edit-estabelecimento',
  templateUrl: './edit-estabelecimento.component.html',
  styleUrls: ['./edit-estabelecimento.component.scss'],
})
export class EditEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  estabelecimentoForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    this.setEstabelecimentoByUrlParam();
  }

  async setEstabelecimentoByUrlParam() {
    const id: number = this.getIdFromUrl();
    this.service.getEstabelecimentoById(id).subscribe(
      (res) => {
        this.setFormFromEstabelecimento(res);
      },
      (err) => {
        this.toastUtil.showError(err);
      }
    );
    this.loading = false;
  }

  setFormFromEstabelecimento(estabelecimento: Estabelecimento) {
    this.estabelecimentoForm.patchValue({
      nome: estabelecimento.nome,
      telefone: estabelecimento.telefone,
      rua: estabelecimento.endereco?.rua,
      bairro: estabelecimento.endereco?.bairro,
      numero: estabelecimento.endereco?.numero,
    });
  }

  getIdFromUrl(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit() {
    let estabelecimento: Estabelecimento = this.estabelecimentoForm.value;
    estabelecimento.id = this.getIdFromUrl();
    estabelecimento.endereco = {
      rua: this.estabelecimentoForm.value.rua,
      bairro: this.estabelecimentoForm.value.bairro,
      numero: this.estabelecimentoForm.value.numero,
    };
    this.service.updateEstabelecimento(estabelecimento).subscribe(
      () => {
        this.toastUtil.showSuccess(
          'Sucesso',
          'Estabelecimento editado com sucesso.'
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
