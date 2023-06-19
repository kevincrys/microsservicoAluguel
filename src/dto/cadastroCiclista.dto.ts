import { nacionalidade } from "src/enums/nacionalidade.enum";
import { Passaporte } from "./passaporte.dto";
import {  IsDateString, IsEmail, IsNotEmpty } from 'class-validator';
import { novoCiclista } from "./novoCiclista.dto";
import { novoCartao } from "./novoCartao.dto";

export class CadastroCiclista {
  @IsNotEmpty()
  Ciclista: novoCiclista;
  
  @IsDateString()
  @IsNotEmpty()
  MetodoDePagamento: novoCartao;


}

