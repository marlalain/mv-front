import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-list-estabelecimentos',
  templateUrl: './list-estabelecimentos.component.html',
  styleUrls: ['./list-estabelecimentos.component.scss'],
})
export class ListEstabelecimentosComponent implements OnInit {
  estabelecimentos: Estabelecimento[] = [];
  totalRecords = 0;
  rows = 10;
  loading: boolean;
  filterNome: string;

  constructor(
    private service: EstabelecimentoService,
    private router: Router,
    private toastUtil: ToastUtilService,
    private confirmationService: ConfirmationService
  ) {
    this.loading = true;
    this.fetchEstabelecimentos();
    this.filterNome = '';
  }

  ngOnInit(): void {}

  filter(event: any) {
    this.loading = true;
    this.fetchEstabelecimentos(undefined, undefined, event.data);
  }

  lazyLoadEstabelecimentos(event: LazyLoadEvent) {
    this.loading = true;
    let page = event.first! / this.rows;
    this.fetchEstabelecimentos(page, event.rows);
  }

  fetchEstabelecimentos(
    page?: number,
    size: number = this.rows,
    nome?: string
  ): void {
    this.service.getEstabelecimentos(page, size, nome).subscribe(
      (res) => {
        this.estabelecimentos = res.content;
        this.totalRecords = res.totalElements;
        this.rows = res.size;
        this.loading = false;
      },
      (err) => {
        this.toastUtil.showError(err);
      }
    );
  }

  newEstabelecimento() {
    this.router.navigateByUrl('/estabelecimentos/new');
  }

  viewEstabelecimento(estabelecimento: Estabelecimento) {
    this.router.navigateByUrl(`/estabelecimentos/view/${estabelecimento.id}`);
  }

  editEstabelecimento(estabelecimento: Estabelecimento) {
    this.router.navigateByUrl(`/estabelecimentos/edit/${estabelecimento.id}`);
  }

  deleteEstabelecimento(estabelecimento: Estabelecimento) {
    this.confirmationService.confirm({
      message: `Você quer mesmo deletar o estabelecimento "${estabelecimento.nome}"?`,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service.deleteEstabelecimento(estabelecimento).subscribe(
          () => {
            this.fetchEstabelecimentos();
            this.toastUtil.showWarn(
              'Deletado',
              `${estabelecimento.nome} foi deletado.`
            );
          },
          (err) => {
            this.fetchEstabelecimentos();
            this.toastUtil.showError(err);
          }
        );
      },
    });
  }
}
