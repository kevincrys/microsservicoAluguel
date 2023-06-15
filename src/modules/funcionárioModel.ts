
import { Funcionario } from "src/schemas/funcionario.schema";
import { v4 as uuidv4 } from 'uuid';
import { novoFuncionario } from "src/dto/novoFuncionario.dto";


let FuncionariosNovos: Funcionario[] = []
export class FuncionarioService {

    


async insertFuncionario (Funcionario: novoFuncionario) {
    
    var matricula= uuidv4()

    FuncionariosNovos.push({ ...Funcionario, matricula })
}


async updateFuncionario (matricula: string, Funcionario: Funcionario): Promise<boolean> {
    const index = FuncionariosNovos.findIndex((Funcionario) => Funcionario.matricula === matricula)
    if (index !== -1) {
        FuncionariosNovos[index] = { ...Funcionario, matricula }
        return true
      }
      return false
}

async deleteFuncionario (matricula: string): Promise<boolean> {
    const beforeLenght = FuncionariosNovos.length
    FuncionariosNovos = FuncionariosNovos.filter((Funcionario) => Funcionario.matricula !== matricula)
    return beforeLenght !== FuncionariosNovos.length
    }

async getFuncionarios (): Promise<Funcionario[]> {
            return  FuncionariosNovos
        }

async getFuncionarioByID (matricula: string): Promise<Funcionario> {
            return  FuncionariosNovos.find((Funcionario) => Funcionario.matricula === matricula)
        }
            





}

