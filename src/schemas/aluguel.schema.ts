import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Aluguel {
  @PrimaryColumn()
  ciclista: number;
  @Column()
  trancaInicio: number;
  @Column()
  bicicleta: number;
  @Column()
  horaInicio: string;
  @Column({nullable: true })
  trancaFim?: number;
  @Column({nullable: true })
  horaFim?: string;
  @Column()
  cobranca: number;
    
  }
