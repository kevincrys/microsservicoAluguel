import { Injectable, NotFoundException } from '@nestjs/common';
import { novoFuncionario } from "../../dto/novoFuncionario.dto";
import { FuncionarioRepository } from './funcionario.repository';
import {Utils} from '../../common/utils';
import { Funcionario } from 'src/schemas/Funcionario.schema';
@Injectable()
export class FuncionarioService {
  constructor(
    private readonly funcionarioRepository:FuncionarioRepository,
    private readonly utils:Utils
  ) {}

  async insertFuncionario(Funcionario: novoFuncionario): Promise<Boolean> {
    this.funcionarioRepository.insertFuncionario(Funcionario)
    return true
  }

  async updateFuncionario(id: string, Funcionario: novoFuncionario): Promise<Boolean> {
   
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= await this.funcionarioRepository.updateFuncionario(id,Funcionario)
    if(update === false){throw new NotFoundException("Não encontrado")}
    return true

  }
  }

  async deleteFuncionario(id: string): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= await this.funcionarioRepository.deleteFuncionario(id)
    if(update === false){
      throw new NotFoundException("Não encontrado")
    }
    return true
  }
  }
  async getFuncionarioByID(id: string): Promise<Funcionario> {
    
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= await this.funcionarioRepository.getFuncionarioByID(id)
    if(this.utils.checkNullOrBlank(update)){
      throw new NotFoundException("Não encontrado")
  }
    return update
  }
  }

  async getFuncionarios(): Promise<Funcionario[]> {
   
    const array= await this.funcionarioRepository.getFuncionarios()
    array.forEach((el) => {
      console.log("el", el)

    })
    return array
  }

}


          