import { Module } from '@nestjs/common';
import { CiclistaController } from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepository } from './ciclista.repository';
import { Utils } from '../../common/utils';
import { CartaoModule } from '../cartao/cartao.module';
import { AluguelRepository } from '../aluguel/aluguel.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciclista } from '../../schemas/ciclista.schema';
import { Aluguel } from 'src/schemas/aluguel.schema';

@Module({
  imports: [CartaoModule,TypeOrmModule.forFeature([Ciclista]),TypeOrmModule.forFeature([Aluguel])],
  controllers: [CiclistaController],
  providers: [CiclistaService,CiclistaRepository, Utils,AluguelRepository],
  exports: [CiclistaService, Utils]
})
export class CiclistaModule {}
