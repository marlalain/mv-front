import { Endereco } from './endereco.model';
import { Estabelecimento } from './estabelecimento.model';
import { Link } from './hateoas/link';
import { Numero } from './numero.model';

export type Profissional = {
  id?: number;
  nome?: string;
  endereco?: Endereco;
  numero?: Numero;
  funcao?: string;
  estabelecimentos?: Estabelecimento[];
  links?: Link[];
};
