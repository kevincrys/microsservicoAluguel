import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cartao } from './schemas/cartao.schema';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'motty.db.elephantsql.com',
  port: 5432,
  username: 'abjsgzsc',
  password: 'EQzpRKCoPuuFOCWlGXcsTTYgJv8Er0u0',
  database: 'abjsgzsc',
  entities: [Cartao],
  synchronize: true, // Somente para ambiente de desenvolvimento
};