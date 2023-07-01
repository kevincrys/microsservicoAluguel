import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class Devolucao {

  @Column()
    ciclista: number;
    @Column()
    trancaFim: number;
    @Column()
    bicicleta: number;
    @Column()
    horaInicio: string;
    @Column()
    trancaInicio: number;
    @Column()
    horaFim: string;
    @Column()
    cobranca: number;
      
    
  }

