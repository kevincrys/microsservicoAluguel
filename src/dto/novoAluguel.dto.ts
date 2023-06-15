import { IsNotEmpty } from "class-validator";

export class novoAluguel {
  @IsNotEmpty()
  ciclista: number;
  @IsNotEmpty()
  trancaInicio: number;
    
  }

