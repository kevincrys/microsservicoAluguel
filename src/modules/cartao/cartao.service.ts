import { Injectable, NotFoundException } from '@nestjs/common';
import { novoCartao } from "src/dto/novocartao.dto";
import { CartaoRepository } from './cartao.repository';
import {Utils} from '../../common/utils';
import { Cartao } from 'src/schemas/cartao.schema';
@Injectable()
export class CartaoService {
  constructor(
    private readonly cartaoRepository:CartaoRepository,
    private readonly utils:Utils
  ) {}

  async insertcartao(cartao: novoCartao): Promise<Boolean> {
    
    if(!this.utils.checkNullOrBlank(cartao)){
    this.cartaoRepository.insertcartao(cartao)
    }
    else{
        console.log("erro")
    }
    return true
  }

  async updatecartao(id: number, cartao: novoCartao): Promise<Boolean> {
   
    if(!this.utils.checkNullOrBlank(cartao)){
    const update= this.cartaoRepository.updatecartao(id,cartao)
    if(update === null){
      throw new NotFoundException("Não encontrado")
  }

    return update
  }
  }



  async getcartaoByID(id: number): Promise<Cartao> {
    
    
    const update= await this.cartaoRepository.getcartaoByID(id)
    if(update === null){
      throw new NotFoundException("Não encontrado")
  }
    console.log(update)
    return update
  
  }


}


          