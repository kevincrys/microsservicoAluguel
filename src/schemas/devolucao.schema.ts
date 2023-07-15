import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Devolucao {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
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

