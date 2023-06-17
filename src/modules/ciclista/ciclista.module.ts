import { Module } from '@nestjs/common';
import { CiclistaController } from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepository } from './ciclista.repository';
import { Utils } from 'src/common/utils';
import { CartaoModule } from '../cartao/cartao.module';

@Module({
  imports: [CartaoModule],
  controllers: [CiclistaController],
  providers: [CiclistaService,CiclistaRepository, Utils],
  exports: [CiclistaService, Utils]
})
export class CiclistaModule {}
