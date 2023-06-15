import { statusCiclista } from "src/enums/statusCiclista.enum";
import { Passaporte } from "../dto/passaporte.dto";
import { nacionalidade } from "src/enums/nacionalidade.enum";

export class Ciclista {

  nome: string;

  nascimento: string;

  cpf: string;
 
  passaporte: Passaporte;

  nacionalidade: nacionalidade;

  email: string;

  urlFotoDocumento: string;

  senha: string;

  id: number;

  status: statusCiclista
}

