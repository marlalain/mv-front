import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/dto/page';
import { Estabelecimento } from '../model/estabelecimento.model';
import { Link } from '../model/hateoas/link';

@Injectable({
  providedIn: 'root',
})
export class EstabelecimentoService {
  private readonly API_URL = 'http://localhost:8080/api/v1/estabelecimentos';

  constructor(private http: HttpClient) {}

  public createEstabelecimento(estabelecimento: Estabelecimento) {
    return this.http.post(this.API_URL, estabelecimento);
  }

  public getEstabelecimentos(
    page?: number,
    size?: number,
    nome?: string
  ): Observable<Page<Estabelecimento>> {
    return this.http.get<Page<Estabelecimento>>(
      `${this.API_URL}?page=${page ? page : `0`}&size=${
        size ? size : '10'
      }&nome=${nome ? nome : ''}`
    );
  }

  public getEstabelecimentoById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  public deleteEstabelecimento(estabelecimento: Estabelecimento) {
    // utilizando os links do HATEOAS
    return this.http.delete(this.unwrapLink(estabelecimento.links!, 'delete'));
  }

  public updateEstabelecimento(estabelecimento: Estabelecimento) {
    // fazendo os requests normalmente
    return this.http.put(
      `${this.API_URL}/${estabelecimento.id}`,
      estabelecimento
    );
  }

  unwrapLink(links: Link[], rel: string): string {
    return links.filter((link) => link.rel == rel)[0].href;
  }
}
