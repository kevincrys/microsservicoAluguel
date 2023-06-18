import { IsDateString, IsNotEmpty } from "class-validator";

export class Passaporte {
  @IsNotEmpty()
  numero: string;

  @IsDateString()
  @IsNotEmpty()
  validade: string;
  @IsNotEmpty()

  pais: string;

}





