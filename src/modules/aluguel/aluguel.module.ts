import { Module } from '@nestjs/common';
import { AluguelController } from './aluguel.controller';
import { AluguelService } from './aluguel.service';
import { AluguelRepository } from './aluguel.repository';
import { Utils } from 'src/common/utils';

@Module({
  imports: [],
  controllers: [AluguelController],
  providers: [AluguelService,AluguelRepository, Utils],
  exports: [AluguelService, Utils]
})
export class AluguelModule {}
