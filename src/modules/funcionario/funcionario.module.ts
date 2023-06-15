import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioRepository } from './funcionario.repository';
import { Utils } from 'src/common/utils';

@Module({
  imports: [],
  controllers: [FuncionarioController],
  providers: [FuncionarioService,FuncionarioRepository, Utils],
  exports: [FuncionarioService, Utils]
})
export class FuncionarioModule {}
