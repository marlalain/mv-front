import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Page } from 'src/app/model/dto/page';
import { Profissional } from 'src/app/model/profissional.model';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-list-profissionais',
  templateUrl: './list-profissionais.component.html',
  styleUrls: ['./list-profissionais.component.scss'],
})
export class ListProfissionaisComponent implements OnInit {
  profissionais: Profissional[] = [];
  totalRecords = 0;
  rows = 10;
  loading: boolean;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private service: ProfissionalService,
    private toastUtil: ToastUtilService
  ) {
    this.loading = true;
  }

  lazyLoadProfissionais(event: LazyLoadEvent) {
    this.loading = true;
    let page = event.first! / this.rows;
    this.fetchProfissionais(page, event.rows);
  }

  fetchProfissionais(page?: number, size: number = this.rows) {
    this.service.getProfissionais(page, size).subscribe(
      (res: Page<Profissional>) => {
        this.profissionais = res.content;
        this.totalRecords = res.totalElements;
        this.rows = res.size;
        this.loading = false;
      },
      (err) => {
        this.toastUtil.showError(err);
      }
    );
  }

  newProfissional() {
    this.router.navigateByUrl('profissionais/new');
  }

  viewProfissional(profissional: Profissional) {
    this.router.navigateByUrl(`profissionais/view/${profissional.id}`);
  }

  editProfissional(profissional: Profissional) {
    this.router.navigateByUrl(`profissionais/edit/${profissional.id}`);
  }

  deleteProfissional(profissional: Profissional) {
    this.confirmationService.confirm({
      message: `Você quer mesmo deletar o profissional "${profissional.nome}"?`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service.deleteProfissional(profissional).subscribe(
          () => {
            this.fetchProfissionais();
            this.toastUtil.showWarn(
              'Deletado',
              `${profissional.nome} foi deletado.`
            );
          },
          (err) => {
            this.fetchProfissionais();
            this.toastUtil.showError(err);
          }
        );
      },
    });
  }

  ngOnInit(): void {}
}
