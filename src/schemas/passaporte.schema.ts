

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Passaporte {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  numero: string;

  @Column()
  validade: string;
  
  @Column()
  pais: string;

}





