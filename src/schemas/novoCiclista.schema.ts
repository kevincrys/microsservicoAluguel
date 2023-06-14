import { nacionalidade } from "src/enums/nacionalidade.enum";
import { Passaporte } from "./Passaporte.schema";

export class novoCiclista {

  nome: string;

  nascimento: string;

  cpf: string;
 
  passaporte: Passaporte;

  nacionalidade: nacionalidade;

  email: string;

  urlFotoDocumento: string;

  senha: string;
}

