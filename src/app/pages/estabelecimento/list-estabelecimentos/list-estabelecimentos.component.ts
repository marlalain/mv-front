import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
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

  constructor(
    private service: EstabelecimentoService,
    private router: Router,
    private toastUtil: ToastUtilService
  ) {
    this.loading = true;
    this.fetchEstabelecimentos();
  }

  ngOnInit(): void {}

  lazyLoadEstabelecimentos(event: LazyLoadEvent) {
    this.loading = true;
    let page = event.first! / this.rows;
    this.fetchEstabelecimentos(page, event.rows);
  }

  fetchEstabelecimentos(page?: number, size: number = this.rows): void {
    this.service.getEstabelecimentos(page, size).subscribe(
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

  viewEstabelecimento(estabelecimento: Estabelecimento) {
    this.router.navigateByUrl(`/estabelecimentos/view/${estabelecimento.id}`);
  }

  editEstabelecimento(estabelecimento: Estabelecimento) {
    this.router.navigateByUrl(`/estabelecimentos/edit/${estabelecimento.id}`);
  }

  deleteEstabelecimento(estabelecimento: Estabelecimento) {
    this.service
      .deleteEstabelecimento(estabelecimento)
      .subscribe(() => this.fetchEstabelecimentos());
  }
}
