import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/dto/page';
import { Estabelecimento } from '../model/estabelecimento.model';
import { Link } from '../model/hateoas/link';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstabelecimentoService {
  private readonly API_URL = 'http://localhost:8080/api/v1/estabelecimentos';

  constructor(private http: HttpClient) {}

  public getEstabelecimentos(
    page?: number,
    size?: number
  ): Observable<Page<Estabelecimento>> {
    return this.http.get<Page<Estabelecimento>>(
      `${this.API_URL}?page=${page ? page : `0`}&size=${size ? size : `10`}`
    );
  }

  public deleteEstabelecimento(estabelecimento: Estabelecimento) {
    return this.http.delete(this.unwrapLink(estabelecimento.links!, 'delete'));
  }

  unwrapLink(links: Link[], rel: string): string {
    return links.filter((link) => link.rel == rel)[0].href;
  }
}
