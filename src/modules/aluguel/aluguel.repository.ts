
import { Aluguel } from "src/schemas/Aluguel.schema";



let aluguelsNovos: Aluguel[] = []
export class AluguelRepository {


async insertAluguel (aluguel: Aluguel) {
   try{
    aluguelsNovos.push(aluguel)
   }
   catch{
    return false
   }
   return true
}






}

