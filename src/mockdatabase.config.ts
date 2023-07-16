import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const mockDatabaseConfig: TypeOrmModuleOptions ={
    type: 'sqlite',
    database: ':memory:',
    entities: [],
    synchronize: true,
    logging: false,
    dropSchema: true,
  }
