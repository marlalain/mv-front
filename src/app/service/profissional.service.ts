import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/dto/page';
import { Link } from '../model/hateoas/link';
import { Profissional } from '../model/profissional.model';

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  private readonly API_URL = 'http://localhost:8080/api/v1/profissionais';

  constructor(private http: HttpClient) {}

  public create(profissional: Profissional) {
    return this.http.post(this.API_URL, profissional).toPromise();
  }

  public findPages(
    page?: number,
    size?: number,
    nome?: string
  ): Promise<Page<Profissional>> {
    return this.http
      .get<Page<Profissional>>(
        `${this.API_URL}?page=${page ? page : `0`}&size=${
          size ? size : '10'
        }&nome=${nome ? nome : ''}`
      )
      .toPromise();
  }

  public findById(id: number): Promise<Profissional> {
    return this.http.get(`${this.API_URL}/${id}`).toPromise();
  }

  public delete(profissional: Profissional) {
    // utilizando os links do HATEOAS
    return this.http
      .delete(this.unwrapLink(profissional.links!, 'delete'))
      .toPromise();
  }

  public update(profissional: Profissional) {
    // fazendo os requests normalmente
    return this.http
      .put(`${this.API_URL}/${profissional.id}`, profissional)
      .toPromise();
  }

  unwrapLink(links: Link[], rel: string): string {
    return links.filter((link) => link.rel == rel)[0].href;
  }
}
