import { Injectable, NotFoundException } from '@nestjs/common';
import { novoFuncionario } from "../../dto/novoFuncionario.dto";
import { FuncionarioRepository } from './funcionario.repository';
import {Utils} from '../../common/utils';
import { Funcionario } from '../../schemas/Funcionario.schema';
@Injectable()
export class FuncionarioService {
  constructor(
    private readonly funcionarioRepository:FuncionarioRepository,
    private readonly utils:Utils
  ) {}

  async insertFuncionario(Funcionario: novoFuncionario): Promise<Funcionario> {
    const funcionario= this.funcionarioRepository.insertFuncionario(Funcionario)
    return funcionario
  }

  async updateFuncionario(id: string, Funcionario: novoFuncionario): Promise<Funcionario> {
   
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= await this.funcionarioRepository.updateFuncionario(id,Funcionario)
    if(update === undefined){throw new NotFoundException("Não encontrado")}
    return update

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
   
   
    const update= await this.funcionarioRepository.getFuncionarioByID(id)
    console.log(update)
    if(this.utils.checkNullOrBlank(update)){
      throw new NotFoundException("Não encontrado")
    }
    return update
  
  }

  async getFuncionarios(): Promise<Funcionario[]> {
   
    const array= await this.funcionarioRepository.getFuncionarios()
    array.forEach((el) => {
      console.log("el", el)

    })
    return array
  }

}


          