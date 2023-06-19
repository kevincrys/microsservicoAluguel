import { IsNotEmpty } from "class-validator";


export class realizaCobrança {

    @IsNotEmpty()
    valor: number;

    @IsNotEmpty()
    ciclista: number;

  }

