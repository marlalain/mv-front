import { Endereco } from './endereco.model';
import { Link } from './hateoas/link';
import { Profissional } from './profissional.model';

export type Estabelecimento = {
  id?: number;
  nome?: string;
  telefone?: string;
  endereco?: Endereco;
  profissionais?: Profissional[];
  links?: Link[];
};
