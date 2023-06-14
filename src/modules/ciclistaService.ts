import { statusCiclista } from "src/enums/statusCiclista.enum";
import { Ciclista } from "src/schemas/Ciclista.schema";
import { novoCiclista } from "src/schemas/novoCiclista.schema";


let ciclistasNovos: Ciclista[] = []
export class CiclistaService {

    


async insertCiclista (ciclista: novoCiclista) {
   
    var id=Math.random()
    var status= statusCiclista.AGUARDANDO
    ciclistasNovos.push({ ...ciclista, id, status })
}


async updateCiclista (id: number, ciclista: Ciclista): Promise<boolean> {
    const index = ciclistasNovos.findIndex((ciclista) => ciclista.id === id)
    if (index !== -1) {
        ciclistasNovos[index] = { ...ciclista, id }
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
            return  ciclistasNovos.find((ciclista) => ciclista.id === id)
        }
            





}

