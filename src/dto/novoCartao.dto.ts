import { IsDateString, IsNotEmpty } from "class-validator";

export class novoCartao {
    @IsNotEmpty()
    nomeTitular: string;

    @IsNotEmpty()
    numero: string;
    
    @IsDateString()
    @IsNotEmpty()
    validade: string;

    @IsNotEmpty()
    cvv:  string;
    
  }