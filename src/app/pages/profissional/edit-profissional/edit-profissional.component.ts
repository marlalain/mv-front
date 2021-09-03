import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { Profissional } from 'src/app/model/profissional.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-edit-profissional',
  templateUrl: './edit-profissional.component.html',
  styleUrls: ['./edit-profissional.component.scss'],
})
export class EditProfissionalComponent implements OnInit {
  profissional: Profissional;
  profissionalForm: FormGroup;
  estabelecimentos: Profissional[] = [];
  selectedEstabelecimentos: Profissional[] = [];
  loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    this.setProfissionalByUrlParam();
    this.fillEstabelecimentos();
  }

  async setProfissionalByUrlParam() {
    const id: number = this.getIdFromUrl();
    this.service.getProfissionalById(id).subscribe(
      (res: Profissional) => {
        console.log(res);
        this.setFormFromEstabelecimento(res);
      },
      (err: any) => {
        this.toastUtil.showError(err);
      }
    );
    this.loading = false;
  }

  setFormFromEstabelecimento(profissional: Profissional) {
    this.profissionalForm.patchValue({
      nome: profissional.nome,
      funcao: profissional.funcao,
      celular: profissional.numero?.celular,
      residencial: profissional.numero?.celular,
      rua: profissional.endereco?.rua,
      bairro: profissional.endereco?.bairro,
      numero: profissional.endereco?.numero,
      estabelecimentos: profissional.estabelecimentos?.map((p) => p.id),
    });
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

  getIdFromUrl(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  setEstabelecimentos() {
    (this.profissionalForm.value.estabelecimentos as number[]).map((id) => {
      this.selectedEstabelecimentos.push(new Estabelecimento(id));
    });
    this.profissionalForm.patchValue({
      estabelecimentos: this.selectedEstabelecimentos,
    });
  }

  onSubmit() {
    this.setEstabelecimentos();
    console.log(this.profissionalForm.value.funcao);
    let profissional: Profissional = this.profissionalForm.value;
    profissional = {
      ...profissional,
      id: this.getIdFromUrl(),
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
