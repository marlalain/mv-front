import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profissional } from 'src/app/model/profissional.model';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ToastUtilService } from 'src/app/service/toast-util.service';

@Component({
  selector: 'app-view-profissional',
  templateUrl: './view-profissional.component.html',
  styleUrls: ['./view-profissional.component.scss'],
})
export class ViewProfissionalComponent implements OnInit {
  profissional: Profissional;
  loading: boolean;

  constructor(
    private service: ProfissionalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastUtil: ToastUtilService
  ) {
    this.loading = true;
    this.profissional = {};
    this.setProfissionalByUrlParam();
  }

  async setProfissionalByUrlParam() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    try {
      this.profissional = await this.service.getProfissionalById(id);
    } catch (error) {
      this.toastUtil.showError(error);
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('profissionais');
  }

  ngOnInit(): void {}
}
