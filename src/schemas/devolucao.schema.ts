import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity()
export class Devolucao {

  @PrimaryColumn()
    ciclista: number;
    @Column()
    trancaFim: number;
    @Column()
    bicicleta: number;
    @Column({nullable: true })
    horaInicio?: string;
    @Column({nullable: true })
    trancaInicio?: number;
    @Column()
    horaFim: string;
    @Column()
    cobranca: number;
      
    
  }

