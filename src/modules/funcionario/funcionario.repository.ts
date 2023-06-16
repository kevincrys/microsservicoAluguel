
import { Funcionario } from "src/schemas/funcionario.schema";
import { v4 as uuidv4 } from 'uuid';
import { novoFuncionario } from "../../dto/novoFuncionario.dto";


let FuncionariosNovos: Funcionario[] = []
export class FuncionarioRepository {

    


async insertFuncionario (Funcionario: novoFuncionario) {
    
    var matricula= uuidv4()

    FuncionariosNovos.push({ ...Funcionario, matricula })
    return { ...Funcionario, matricula }
}


async updateFuncionario (matricula: string, Funcionario: novoFuncionario): Promise<Funcionario> {
    const index = FuncionariosNovos.findIndex((Funcionario) => Funcionario.matricula === matricula)
    if (index !== -1) {
        FuncionariosNovos[index] = { ...Funcionario, matricula }
        return { ...Funcionario, matricula }
      }
      return undefined
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

