
import { Devolucao } from "../../schemas/devolucao.schema";
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


let devolucaosNovos: Devolucao[] = []
@Injectable()
export class DevolucaoRepository {
 constructor(
        @InjectRepository(Devolucao)
        private ciclistaRepository: Repository<Devolucao>,
      ) {}

async insertDevolucao (devolucao: Devolucao) {
  const Devoluc= await this.ciclistaRepository.save(devolucao);
    return Devoluc
}






}

