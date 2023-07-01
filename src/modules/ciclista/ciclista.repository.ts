import { statusCiclista } from "../../enums/statusCiclista.enum";
import { Ciclista } from "../../schemas/ciclista.schema";
import { novoCiclista } from "../../dto/novoCiclista.dto";
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
let ciclistasNovos: Ciclista[] = []
@Injectable()
export class CiclistaRepository {
    constructor(
        @InjectRepository(Ciclista)
        private ciclistaRepository: Repository<Ciclista>,
      ) {}

async insertCiclista (ciclista: novoCiclista): Promise<Ciclista> {
    
    const card= await this.ciclistaRepository.save(ciclista);
    return card
    
}


async updateCiclista (id: number, ciclista: novoCiclista): Promise<Ciclista> {
    await this.ciclistaRepository.update(id, ciclista)
    return await this.ciclistaRepository.findOneBy({id: id})
}

async deleteCiclista (id: number): Promise<boolean> {
    var ciclistaArray= await this.getCiclistas()
    const beforeLenght = ciclistaArray.length
    ciclistasNovos = ciclistaArray.filter((ciclista) => ciclista.id !== id)
    ciclistaArray=ciclistasNovos
    return beforeLenght !== ciclistaArray.length
    }

async getCiclistas (): Promise<Ciclista[]> {
    return  await this.ciclistaRepository.find()
        }

async getCiclistaByID (id: number): Promise<Ciclista> {
    return  await this.ciclistaRepository.findOneBy({id: id})
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

