import { Module } from '@nestjs/common';
import { CartaoController } from './cartao.controller';
import { CartaoService } from './cartao.service';
import { CartaoRepository } from './cartao.repository';
import { Utils } from '../../common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from 'src/schemas/cartao.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Cartao])],
  controllers: [CartaoController],
  providers: [CartaoService,CartaoRepository, Utils],
  exports: [CartaoService, Utils]
})
export class CartaoModule {}
