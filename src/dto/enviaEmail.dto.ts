import { IsNotEmpty } from "class-validator";

  export class enviaEmail {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    assunto: string;

    @IsNotEmpty()
    mensagem: string;
    
  }