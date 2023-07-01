import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioRepository } from './funcionario.repository';
import { Utils } from '../../common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from '../../schemas/funcionario.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  controllers: [FuncionarioController],
  providers: [FuncionarioService,FuncionarioRepository, Utils],
  exports: [FuncionarioService, Utils]
})
export class FuncionarioModule {}
