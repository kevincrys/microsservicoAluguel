
import { Aluguel } from "src/schemas/aluguel.schema";

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AluguelRepository {
 constructor(
        @InjectRepository(Aluguel)
        private aluguelRepository: Repository<Aluguel>,
      ) {}

async insertAluguel (aluguel: Aluguel) {
   const alugado= await this.aluguelRepository.save(aluguel);
   return alugado
}

async getAluguels (): Promise<Aluguel[]> {
   return  await this.aluguelRepository.find()
}

async permiteAluguel (id: number): Promise<Boolean> {
   const aluguel=  await this.aluguelRepository.findOneBy({ciclista: id})

if (aluguel !== null) {
    return false
  }
  return true
}

async getBikeByCiclista (id: number): Promise<number> {
   const aluguel=  await this.aluguelRepository.findOneBy({ciclista: id})
   
      if(aluguel===null){return }
      return aluguel?.bicicleta
   }


}

