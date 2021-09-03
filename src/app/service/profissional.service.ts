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

  public getProfissionais(
    page?: number,
    size?: number
  ): Observable<Page<Profissional>> {
    return this.http.get<Page<Profissional>>(
      `${this.API_URL}?page=${page ? page : `0`}&size=${size ? size : ''}`
    );
  }

  public getProfissionalById(id: number): Observable<Profissional> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  public deleteProfissional(profissional: Profissional) {
    // utilizando os links do HATEOAS
    return this.http.delete(this.unwrapLink(profissional.links!, 'delete'));
  }

  public updateProfissional(profissional: Profissional) {
    // fazendo os requests normalmente
    return this.http.put(`${this.API_URL}/${profissional.id}`, profissional);
  }

  unwrapLink(links: Link[], rel: string): string {
    return links.filter((link) => link.rel == rel)[0].href;
  }
}
