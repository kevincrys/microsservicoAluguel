import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cartao } from './schemas/cartao.schema';
import { Aluguel } from './schemas/aluguel.schema';
import { Ciclista } from './schemas/ciclista.schema';
import { Devolucao } from './schemas/devolucao.schema';
import { Funcionario } from './schemas/funcionario.schema';
import { Passaporte } from './schemas/passaporte.schema';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'motty.db.elephantsql.com',
  port: 5432,
  username: 'abjsgzsc',
  password: 'EQzpRKCoPuuFOCWlGXcsTTYgJv8Er0u0',
  database: 'abjsgzsc',
  entities: [Cartao,Aluguel,Ciclista,Devolucao,Funcionario,Passaporte],
  synchronize: true, // Somente para ambiente de desenvolvimento
};