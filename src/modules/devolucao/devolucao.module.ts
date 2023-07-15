import { Module } from '@nestjs/common';
import { DevolucaoController } from './devolucao.controller';
import { DevolucaoService } from './devolucao.service';
import { DevolucaoRepository } from './devolucao.repository';
import { Utils } from '../../common/utils';
import { CiclistaModule } from '../ciclista/ciclista.module';
import { Devolucao } from '../../schemas/devolucao.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from '../../common/api';
import { AluguelModule } from '../aluguel/aluguel.module';

@Module({
  imports: [CiclistaModule,AluguelModule,TypeOrmModule.forFeature([Devolucao])],
  controllers: [DevolucaoController],
  providers: [DevolucaoService,DevolucaoRepository, Utils,Api],
  exports: [DevolucaoService, Utils,Api]
})
export class DevolucaoModule {}
