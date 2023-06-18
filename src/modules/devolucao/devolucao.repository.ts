
import { Devolucao } from "src/schemas/Devolucao.schema";



let devolucaosNovos: Devolucao[] = []
export class DevolucaoRepository {


async insertDevolucao (devolucao: Devolucao) {
   try{
    devolucaosNovos.push(devolucao)
   }
   catch{
    return false
   }
   return true
}






}

