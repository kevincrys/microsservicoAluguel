
import { Funcionario } from "../../schemas/funcionario.schema";

import { novoFuncionario } from "../../dto/novoFuncionario.dto";


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
let FuncionariosNovos: Funcionario[] = []
@Injectable()

export class FuncionarioRepository {
    constructor(
        @InjectRepository(Funcionario)
        private funcionarioRepository: Repository<Funcionario>,
      ) {}

    


async insertFuncionario (funcionario: novoFuncionario) {
    
    const card= await this.funcionarioRepository.save(funcionario);
    return card
}


async updateFuncionario (matricula: string, Funcionario: novoFuncionario): Promise<Funcionario> {
    await this.funcionarioRepository.update(matricula, Funcionario)
    return await this.funcionarioRepository.findOneBy({matricula: matricula})
}

async deleteFuncionario (matricula: string): Promise<boolean> {
    await this.funcionarioRepository.delete(matricula);
    const ciclista= this.getFuncionarioByID(matricula)
    if(ciclista===null){
        return true
    }
    return false
    }

async getFuncionarios (): Promise<Funcionario[]> {
    return  await this.funcionarioRepository.find()
        }

async getFuncionarioByID (matricula: string): Promise<Funcionario> {
    return  await this.funcionarioRepository.findOneBy({matricula: matricula})
            
        }                     

}  

