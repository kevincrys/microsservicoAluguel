import { nacionalidade } from "src/enums/nacionalidade.enum";
import { Passaporte } from "./passaporte.dto";
import {  IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class novoCiclista {
  @IsNotEmpty()
  nome: string;
  
  @IsDateString()
  @IsNotEmpty()
  nascimento: string;

  @IsNotEmpty()
  cpf: string;

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

