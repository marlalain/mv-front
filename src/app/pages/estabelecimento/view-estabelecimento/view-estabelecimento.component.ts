import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-view-estabelecimento',
  templateUrl: './view-estabelecimento.component.html',
  styleUrls: ['./view-estabelecimento.component.scss'],
})
export class ViewEstabelecimentoComponent implements OnInit {
  estabelecimento: Estabelecimento;
  loading: boolean;

  constructor(
    private service: EstabelecimentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastUtil: ToastUtilService
  ) {
    this.loading = true;
    this.estabelecimento = {};
    this.setEstabelecimentoByUrlParam();
  }

  async setEstabelecimentoByUrlParam() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.estabelecimento = await this.service.getEstabelecimentoById(id);
    } catch (error) {
      this.toastUtil.showError(error);
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('estabelecimentos');
  }

  ngOnInit(): void {}
}
