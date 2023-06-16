import { statusCiclista } from "src/enums/statusCiclista.enum";
import { Ciclista } from "src/schemas/Ciclista.schema";
import { novoCiclista } from "src/dto/novoCiclista.dto";


let ciclistasNovos: Ciclista[] = []
export class CiclistaRepository {


async insertCiclista (ciclista: novoCiclista) {
    console.log(ciclista)
   try{
  
  const id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    
  const status= statusCiclista.AGUARDANDO
    ciclistasNovos.push({ ...ciclista, id, status })
   }
   catch{
    return false
   }
   return true
}


async updateCiclista (id: number, ciclista: novoCiclista): Promise<boolean> {
    const index = ciclistasNovos.findIndex((ciclista) => ciclista.id === id)
    
    if (index !== -1) {
        const status= ciclistasNovos[index].status
        ciclistasNovos[index] = {...ciclista,id,status}
        return true
      }
      return false
}

async deleteCiclista (id: number): Promise<boolean> {
    const beforeLenght = ciclistasNovos.length
    ciclistasNovos = ciclistasNovos.filter((ciclista) => ciclista.id !== id)
    return beforeLenght !== ciclistasNovos.length
    }

async getCiclistas (): Promise<Ciclista[]> {
            return  ciclistasNovos
        }

async getCiclistaByID (id: number): Promise<Ciclista> {
            
            const ciclista=  ciclistasNovos.find((ciclista) => ciclista.id === id)
            return ciclista
        }

async checkEmail (email: string): Promise<boolean> {
    const index = ciclistasNovos.findIndex((ciclista) => ciclista.email === email)
    if (index !== -1) {
        return false
      }
      return true
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

