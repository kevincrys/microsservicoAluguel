import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { novoCiclista } from "src/dto/novoCiclista.dto";
import { CiclistaRepository } from './ciclista.repository';
import {Utils} from '../../common/utils';
import { Ciclista } from 'src/schemas/Ciclista.schema';
import { CadastroCiclista } from 'src/dto/cadastroCiclista';
import { CartaoService } from '../cartao/cartao.service';
@Injectable()
export class CiclistaService {
  constructor(
    private readonly ciclistaRepository:CiclistaRepository,
    private readonly utils:Utils,
    private readonly cartaoService:CartaoService
  ) {}

  async insertCiclista(ciclista: CadastroCiclista): Promise<Boolean> {
   
    if(this.validaCartaoMock()){
    this.cartaoService.insertcartao(ciclista.MetodoDePagamento)

  
    if(!this.utils.checkNullOrBlank(ciclista)){
    this.ciclistaRepository.insertCiclista(ciclista.Ciclista)
    }
      this.sendEmailMock()
    return true
  }else{
    
  }
  
}

  async updateCiclista(id: number, ciclista: novoCiclista): Promise<Boolean> {
   
    if(!this.utils.checkNullOrBlank(ciclista)){
    const update= await this.ciclistaRepository.updateCiclista(id,ciclista)
    if(update === true){return update}
    else{
      throw new NotFoundException("Não encontrado")
    }
   
  }
  }

  async ativarCiclista(id: number): Promise<Boolean> {

    const update= await this.ciclistaRepository.ativarCiclista(id)
    if(update === true){return update}
    else{
      throw new NotFoundException("Não encontrado")
    }
  
  }

  async deleteCiclista(id: number): Promise<Boolean> {
    
 
    const update= this.ciclistaRepository.deleteCiclista(id)

    return update
 
  }
  async getCiclistaByID(id: number): Promise<Boolean> {
    

    const update= await this.ciclistaRepository.getCiclistaByID(id)
    console.log(update)
    return true
  
  }
  async checkEmail(email: string): Promise<Boolean> {
    
    if(this.utils.checkNullOrBlank(email)){
      throw new BadRequestException
    }
    const update= await this.ciclistaRepository.checkEmail(email)
    console.log(update)
    return update
  
  }
  
  async getCiclistas(): Promise<Ciclista[]> {
   
    const array= await this.ciclistaRepository.getCiclistas()
    array.forEach((el) => {
      console.log("el", el)

    })
    return array
  }

  async validaCartaoMock(): Promise<boolean> {
   

    return true
  }
  async sendEmailMock(): Promise<boolean> {
   

    return true
  }


}


          