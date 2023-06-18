
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

async getCiclistas (): Promise<Aluguel[]> {
   return  aluguelsNovos
}

async permiteAluguel (id: number): Promise<Boolean> {
const aluguelArray= await this.getCiclistas()
const index = aluguelArray.findIndex((aluguel) => aluguel.ciclista === id)
if (index !== -1) {
    return false
  }
  return true
}

async getBikeByCiclista (id: number): Promise<number> {
   const aluguelArray= await this.getCiclistas()
      const aluguelfim=  aluguelArray.find((aluguel) => aluguel.ciclista === id)
      return aluguelfim.bicicleta
   }


}

