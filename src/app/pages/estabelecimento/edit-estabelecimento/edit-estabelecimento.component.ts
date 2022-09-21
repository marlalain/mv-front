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
    this.estabelecimento = {};
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

    try {
      const estabelecimento = await this.service.getEstabelecimentoById(id);
      this.setFormFromEstabelecimento(estabelecimento);
    } catch (error) {
      this.toastUtil.showError(error);
    } finally {
      this.loading = false;
    }
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

  async onSubmit() {
    let estabelecimento: Estabelecimento = this.estabelecimentoForm.value;
    estabelecimento.id = this.getIdFromUrl();
    estabelecimento.endereco = {
      rua: this.estabelecimentoForm.value.rua,
      bairro: this.estabelecimentoForm.value.bairro,
      numero: this.estabelecimentoForm.value.numero,
    };
    try {
      await this.service.updateEstabelecimento(estabelecimento);
      this.toastUtil.showSuccess(
        'Sucesso',
        'Estabelecimento editado com sucesso.'
      );
      this.goBack();
    } catch (error) {
      this.toastUtil.showError(error);
    }
  }

  goBack() {
    this.router.navigateByUrl('estabelecimentos');
  }

  ngOnInit(): void {}
}
