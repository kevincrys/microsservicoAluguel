import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CiclistaModule } from './modules/ciclista/ciclista.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { CartaoModule } from './modules/cartao/cartao.module';
import { AluguelModule } from './modules/aluguel/aluguel.module';
import { DevolucaoModule } from './modules/devolucao/devolucao.module';

@Module({
  imports: [CiclistaModule,FuncionarioModule,CartaoModule,AluguelModule,DevolucaoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
