import { Injectable } from '@nestjs/common';
import { novoCiclista } from "src/dto/novoCiclista.dto";
import { CiclistaRepository } from './ciclista.repository';
import {Utils} from '../../common/utils';
import { Ciclista } from 'src/schemas/Ciclista.schema';
@Injectable()
export class CiclistaService {
  constructor(
    private readonly ciclistaRepository:CiclistaRepository,
    private readonly utils:Utils
  ) {}

  async insertCiclista(Ciclista: novoCiclista): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(Ciclista)){
    this.ciclistaRepository.insertCiclista(Ciclista)
    }
    else{
        console.log("erro")
    }
    return true
  }

  async updateCiclista(id: number, Ciclista: novoCiclista): Promise<Boolean> {
   
    if(!this.utils.checkNullOrBlank(Ciclista)){
    const update= this.ciclistaRepository.updateCiclista(id,Ciclista)

    return update
  }
  }

  async deleteCiclista(id: number): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(Ciclista)){
    const update= this.ciclistaRepository.deleteCiclista(id)

    return update
  }
  }
  async getCiclistaByID(id: number): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(Ciclista)){
    const update= await this.ciclistaRepository.getCiclistaByID(id)
    console.log(update)
    return true
  }
  }

  async getCiclistas(): Promise<Ciclista[]> {
   
    const array= await this.ciclistaRepository.getCiclistas()
    array.forEach((el) => {
      console.log("el", el)

    })
    return array
  }

}


          