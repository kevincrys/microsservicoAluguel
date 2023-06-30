import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Cartao {
    @Column()
    nomeTitular: string;
    @Column({ unique: true })
    numero: string;
    @Column()
    validade: string;
    @Column()
    cvv:  string;
    @PrimaryGeneratedColumn()
    id?: number;
    
  }