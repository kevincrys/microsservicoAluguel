import { Module } from '@nestjs/common';
import { DevolucaoController } from './devolucao.controller';
import { DevolucaoService } from './devolucao.service';
import { DevolucaoRepository } from './devolucao.repository';
import { Utils } from 'src/common/utils';

@Module({
  imports: [],
  controllers: [DevolucaoController],
  providers: [DevolucaoService,DevolucaoRepository, Utils],
  exports: [DevolucaoService, Utils]
})
export class DevolucaoModule {}
