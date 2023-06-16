import { IsNotEmpty } from "class-validator";

export class NovoAluguel {
  @IsNotEmpty()
  ciclista: number;
  @IsNotEmpty()
  trancaInicio: number;
    
  }

