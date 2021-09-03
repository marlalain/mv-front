import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastUtilService {
  constructor(private service: MessageService) {}

  showError(err: any) {
    err.status === 0
      ? this.service.add({
          severity: 'error',
          summary: `Erro ${err.status}: Undefined Error`,
          detail: 'Por favor, inicie a API.',
        })
      : this.service.add({
          severity: 'error',
          summary: `Erro ${err.status}: ${err.error.error}`,
          detail: err.error.message,
        });
  }

  showWarn(summary: string, detail: string) {
    this.service.add({
      severity: 'warn',
      summary: summary,
      detail: detail,
    });
  }
}
