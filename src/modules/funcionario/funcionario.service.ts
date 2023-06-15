import { Injectable } from '@nestjs/common';
import { novoFuncionario } from "src/dto/novoFuncionario.dto";
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
    
    if(!this.utils.checkNullOrBlank(Funcionario)){
    this.funcionarioRepository.insertFuncionario(Funcionario)
    }
    else{
        console.log("erro")
    }
    return true
  }

  async updateFuncionario(id: string, Funcionario: novoFuncionario): Promise<Boolean> {
   
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= this.funcionarioRepository.updateFuncionario(id,Funcionario)

    return update
  }
  }

  async deleteFuncionario(id: string): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= this.funcionarioRepository.deleteFuncionario(id)

    return update
  }
  }
  async getFuncionarioByID(id: string): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(Funcionario)){
    const update= await this.funcionarioRepository.getFuncionarioByID(id)
    console.log(update)
    return true
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


          