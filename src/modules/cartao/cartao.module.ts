import { Module } from '@nestjs/common';
import { CartaoController } from './cartao.controller';
import { CartaoService } from './cartao.service';
import { CartaoRepository } from './cartao.repository';
import { Utils } from '../../common/utils';

@Module({
  imports: [],
  controllers: [CartaoController],
  providers: [CartaoService,CartaoRepository, Utils],
  exports: [CartaoService, Utils]
})
export class CartaoModule {}
