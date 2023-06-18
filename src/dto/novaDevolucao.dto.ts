import { IsNotEmpty } from "class-validator";

export class NovaDevolucao {

    @IsNotEmpty()
    ciclista: number;

    @IsNotEmpty()
    trancaFim: number;
    
  }

