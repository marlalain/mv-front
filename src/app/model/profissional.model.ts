import { Endereco } from './endereco.model';
import { Estabelecimento } from './estabelecimento.model';
import { Link } from './hateoas/link';
import { Numero } from './numero.model';

export class Profissional {
  constructor(
    public id?: number,
    public nome?: string,
    public endereco?: Endereco,
    public numero?: Numero,
    public funcao?: string,
    public estabelecimentos?: Estabelecimento[],
    public links?: Link[]
  ) {}
}
