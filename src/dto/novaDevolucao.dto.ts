import { IsNotEmpty } from "class-validator";

export class novaDevolucao {

    @IsNotEmpty()
    ciclista: number;

    @IsNotEmpty()
    trancaFim: number;
    
  }

