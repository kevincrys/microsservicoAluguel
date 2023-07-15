import { statusCiclista } from "../enums/statusCiclista.enum";
import { Passaporte } from "../schemas/passaporte.schema";
import { nacionalidade } from "../enums/nacionalidade.enum";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
@Entity()
export class Ciclista {
  @Column()
  nome: string;
  @Column()
  nascimento: string;
  @Column()
  cpf: string;
  @OneToOne(type => Passaporte, { cascade: true })
  @JoinColumn()
  passaporte: Passaporte;
  @Column()
  nacionalidade: nacionalidade;
  @Column()
  email: string;
  @Column()
  urlFotoDocumento: string;
  @Column()
  senha: string;
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  status?: statusCiclista
}




