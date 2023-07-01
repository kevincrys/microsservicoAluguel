import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Aluguel {
  @Column()
  ciclista: number;
  @Column()
  trancaInicio: number;
  @Column()
  bicicleta: number;
  @Column()
  horaInicio: string;
  @Column()
  trancaFim?: number;
  @Column()
  horaFim?: string;
  @Column()
  cobranca: number;
    
  }
