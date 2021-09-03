import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';

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
    private location: Location,
    private messageService: MessageService
  ) {
    this.loading = true;
    this.estabelecimento = new Estabelecimento();
    this.setEstabelecimentoByUrlParam();
  }

  setEstabelecimentoByUrlParam() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getEstabelecimentoById(id).subscribe(
      (res) => {
        this.estabelecimento = res;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: `Erro ${err.status}: ${err.error.error}`,
          detail: err.error.message,
        });
      }
    );
    this.loading = false;
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {}
}
