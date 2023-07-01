
import { Funcionario } from "src/schemas/funcionario.schema";
import { v4 as uuidv4 } from 'uuid';
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
            return  FuncionariosNovos
        }

async getFuncionarioByID (matricula: string): Promise<Funcionario> {
    var FuncionariosArray= await this.getFuncionarios()
            return  FuncionariosArray.find((Funcionario) => Funcionario.matricula === matricula)
        }                     

}  

