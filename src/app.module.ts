import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CiclistaModule } from './modules/ciclista/ciclista.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { CartaoModule } from './modules/cartao/cartao.module';
import { AluguelModule } from './modules/aluguel/aluguel.module';
import { DevolucaoModule } from './modules/devolucao/devolucao.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { Cartao } from './schemas/cartao.schema';

@Module({
  imports: [CiclistaModule,FuncionarioModule,CartaoModule,AluguelModule,DevolucaoModule,TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Cartao]),],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
