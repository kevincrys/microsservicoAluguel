
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
    var FuncionariosArray= await this.getFuncionarios()
    const index = FuncionariosArray.findIndex((Funcionario) => Funcionario.matricula === matricula)
    if (index !== -1) {
        FuncionariosArray[index] = { ...Funcionario, matricula }
        return { ...Funcionario, matricula }
      }
      return undefined
}

async deleteFuncionario (matricula: string): Promise<boolean> {
    var FuncionariosArray= await this.getFuncionarios()
    const beforeLenght = FuncionariosArray.length

    FuncionariosNovos = FuncionariosArray.filter((Funcionario) => Funcionario.matricula !== matricula)
    FuncionariosArray=FuncionariosNovos
 
    return beforeLenght !== FuncionariosArray.length
    }

async getFuncionarios (): Promise<Funcionario[]> {
            return  FuncionariosNovos
        }

async getFuncionarioByID (matricula: string): Promise<Funcionario> {
    var FuncionariosArray= await this.getFuncionarios()
            return  FuncionariosArray.find((Funcionario) => Funcionario.matricula === matricula)
        }                     

}  

