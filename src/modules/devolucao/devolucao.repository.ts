
import { Devolucao } from "../../schemas/devolucao.schema";



let devolucaosNovos: Devolucao[] = []
export class DevolucaoRepository {


async insertDevolucao (devolucao: Devolucao) {
   try{
    devolucaosNovos.push(devolucao)
   }
   catch{
      return undefined
     }
     return devolucao
}






}

