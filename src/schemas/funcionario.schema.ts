
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Funcionario {
  @Column()
  senha: string;
  @Column()
  confirmacaoSenha: string;
  @Column()
  email: string;
  @Column()
  nome: string;
  @Column()
  idade: number;
  @Column()
  funcao: string;
  @Column()
  cpf: string;
  @PrimaryGeneratedColumn('uuid')
  matricula?: string;
  
}
 

