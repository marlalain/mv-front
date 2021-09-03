import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profissional } from 'src/app/model/profissional.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-new-profissional',
  templateUrl: './new-profissional.component.html',
  styleUrls: ['./new-profissional.component.scss'],
})
export class NewProfissionalComponent implements OnInit {
  profissional: Profissional;
  profissionalForm: FormGroup;
  estabelecimentos: Profissional[] = [];
  selectedEstabelecimentos: Profissional[] = [];
  loading: boolean;

  constructor(
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private service: ProfissionalService,
    private toastUtil: ToastUtilService
  ) {
    this.loading = true;
    this.profissional = new Profissional();
    this.profissionalForm = new FormGroup({
      nome: new FormControl(''),
      funcao: new FormControl(''),
      celular: new FormControl(''),
      residencial: new FormControl(''),
      rua: new FormControl(''),
      bairro: new FormControl(''),
      numero: new FormControl(''),
      estabelecimentos: new FormControl([]),
    });

    this.fillEstabelecimentos();
  }

  fillEstabelecimentos() {
    this.estabelecimentoService.getEstabelecimentos().subscribe(
      (res) => {
        this.estabelecimentos = res.content;
      },
      (err: any) => {
        this.toastUtil.showError(err);
      }
    );
  }

  onSubmit() {
    console.log(this.profissionalForm.value.funcao);
    let profissional: Profissional = this.profissionalForm.value;
    profissional = {
      ...profissional,
      funcao: this.profissionalForm.value.funcao,
      endereco: {
        rua: this.profissionalForm.value.rua,
        bairro: this.profissionalForm.value.bairro,
        numero: this.profissionalForm.value.numero,
      },
      numero: {
        celular: this.profissionalForm.value.celular,
        residencial: this.profissionalForm.value.residencial,
      },
    };
    console.log(profissional.funcao);
    this.service.updateProfissional(profissional).subscribe(
      () => {
        this.toastUtil.showSuccess(
          'Sucesso',
          'Profissional criado com sucesso.'
        );
        this.goBack();
      },
      (err) => {
        this.toastUtil.showError(err);
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('profissionais');
  }

  ngOnInit(): void {}
}
