import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aluguel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
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
