import { Module } from '@nestjs/common';
import { CiclistaController } from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { CiclistaRepository } from './ciclista.repository';
import { Utils } from 'src/common/utils';

@Module({
  imports: [],
  controllers: [CiclistaController],
  providers: [CiclistaService,CiclistaRepository, Utils],
  exports: [CiclistaService, Utils]
})
export class CiclistaModule {}
