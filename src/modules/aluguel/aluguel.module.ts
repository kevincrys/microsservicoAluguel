import { Module } from '@nestjs/common';
import { AluguelController } from './aluguel.controller';
import { AluguelService } from './aluguel.service';
import { AluguelRepository } from './aluguel.repository';
import { Utils } from '../../common/utils';
import { CiclistaModule } from '../ciclista/ciclista.module';
import { Aluguel } from '../../schemas/aluguel.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Api } from 'src/common/api';

@Module({
  imports: [CiclistaModule,TypeOrmModule.forFeature([Aluguel])],
  controllers: [AluguelController],
  providers: [AluguelService,AluguelRepository, Utils,Api],
  exports: [AluguelService, Utils,Api]
})
export class AluguelModule {}
