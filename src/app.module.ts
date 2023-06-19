import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CiclistaModule } from './modules/ciclista/ciclista.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { CartaoModule } from './modules/cartao/cartao.module';

@Module({
  imports: [CiclistaModule,FuncionarioModule,CartaoModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
