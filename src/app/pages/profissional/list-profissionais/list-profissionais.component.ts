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

  async filter(event: any) {
    this.loading = true;
    await this.fetchProfissionais(undefined, undefined, event.data);
  }

  async lazyLoadProfissionais(event: LazyLoadEvent) {
    this.loading = true;
    let page = event.first! / this.rows;
    await this.fetchProfissionais(page, event.rows);
  }

  async fetchProfissionais(
    page?: number,
    size: number = this.rows,
    nome?: string
  ) {
    try {
      const { content, totalElements } = await this.service.findPages(
        page,
        size,
        nome
      );
      this.profissionais = content;
      this.totalRecords = totalElements;
      this.rows = size;
    } catch (error) {
      this.toastUtil.showError(error);
    } finally {
      this.loading = false;
    }
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
      accept: async () => {
        try {
          await this.service.delete(profissional);
          this.toastUtil.showWarn(
            'Deletado',
            `${profissional.nome} foi deletado.`
          );
          await this.fetchProfissionais();
        } catch (error) {
          this.toastUtil.showError(error);
        } finally {
          this.loading = false;
        }
      },
    });
  }

  ngOnInit(): void {}
}
