import { statusCiclista } from "../../enums/statusCiclista.enum";
import { Ciclista } from "../../schemas/ciclista.schema";
import { novoCiclista } from "../../dto/novoCiclista.dto";


let ciclistasNovos: Ciclista[] = []
export class CiclistaRepository {


async insertCiclista (ciclista: novoCiclista): Promise<Ciclista> {
    var ciclistaAdd= new Ciclista
   try{
  
  const id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    
  const status= statusCiclista.AGUARDANDO
  ciclistaAdd={ ...ciclista, id, status }
    ciclistasNovos.push(ciclistaAdd)
   }
   catch{
    return undefined
   }
   return ciclistaAdd
}


async updateCiclista (id: number, ciclista: novoCiclista): Promise<Ciclista> {
   const ciclistaArray= await this.getCiclistas()
    const index = ciclistaArray.findIndex((ciclista) => ciclista.id === id)
    var ciclistaAdd= new Ciclista
    if (index !== -1) {
        const status= ciclistasNovos[index].status
        ciclistaAdd={ ...ciclista, id, status }
        ciclistaArray[index] = ciclistaAdd
        return ciclistaAdd
      }
      return undefined
}

async deleteCiclista (id: number): Promise<boolean> {
    var ciclistaArray= await this.getCiclistas()
    const beforeLenght = ciclistaArray.length
    ciclistasNovos = ciclistaArray.filter((ciclista) => ciclista.id !== id)
    ciclistaArray=ciclistasNovos
    return beforeLenght !== ciclistaArray.length
    }

async getCiclistas (): Promise<Ciclista[]> {
            return  ciclistasNovos
        }

async getCiclistaByID (id: number): Promise<Ciclista> {
    const ciclistaArray= await this.getCiclistas()
            const ciclista=  ciclistaArray.find((ciclista) => ciclista.id === id)
            return ciclista
        }

async checkEmail (email: string): Promise<boolean> {
    const index = ciclistasNovos.findIndex((ciclista) => ciclista.email === email)
   
    if (index !== -1) {
        return true
      }
      return false
}

        async ativarCiclista (id: number): Promise<boolean> {
            const index = ciclistasNovos.findIndex((ciclista) => ciclista.id === id)
            const status= statusCiclista.ATIVO
            if (index !== -1) {
                ciclistasNovos[index] = { ...ciclistasNovos[index],status }
                return true
              }
              return false
        }
            


  

}

