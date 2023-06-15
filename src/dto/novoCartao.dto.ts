import { IsNotEmpty } from "class-validator";

export class novoCartao {
    @IsNotEmpty()
    nomeTitular: string;

    @IsNotEmpty()
    numero: string;

    @IsNotEmpty()
    validade: string;

    @IsNotEmpty()
    cvv:  string;
    
  }