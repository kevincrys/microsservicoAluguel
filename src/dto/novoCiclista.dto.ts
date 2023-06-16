import { nacionalidade } from "src/enums/nacionalidade.enum";
import { Passaporte } from "./passaporte.dto";
import {  IsDateString, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class novoCiclista {
  @IsNotEmpty()
  nome: string;
  
  @IsDateString()
  @IsNotEmpty()
  nascimento: string;

  @ValidateIf((object) => object.nacionalidade === nacionalidade.BRASILEIRO)
  @IsNotEmpty()
  cpf: string;

  @ValidateIf((object) => object.nacionalidade === nacionalidade.ESTRANGEIRO)
  @IsNotEmpty()
  passaporte: Passaporte;

  @IsNotEmpty()
  nacionalidade: nacionalidade;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  urlFotoDocumento: string;

  @IsNotEmpty()
  senha: string;
}

