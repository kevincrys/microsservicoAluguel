import { IsNotEmpty } from "class-validator";


export class novoFuncionario {
  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  confirmacaoSenha: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  idade: number;

  @IsNotEmpty()
  funcao: string;
  
  @IsNotEmpty()
  cpf: string;
}
 

