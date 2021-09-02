import { Endereco } from './endereco.model';
import { Link } from './hateoas/link';
import { Profissional } from './profissional.model';

export class Estabelecimento {
  constructor(
    public id?: number,
    public nome?: string,
    public telefone?: string,
    public endereco?: Endereco,
    public profissionais?: Profissional[],
    public links?: Link[]
  ) {}
}
