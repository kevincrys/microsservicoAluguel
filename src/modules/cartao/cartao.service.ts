import { Injectable, NotFoundException } from '@nestjs/common';
import { novoCartao } from "../../dto/novoCartao.dto";
import { CartaoRepository } from './cartao.repository';
import {Utils} from '../../common/utils';
import { Cartao } from '../../schemas/cartao.schema';
@Injectable()
export class CartaoService {
  constructor(
    private readonly cartaoRepository:CartaoRepository,
    private readonly utils:Utils
  ) {}

  async insertCartao(cartao: novoCartao, idCiclista :number): Promise<Cartao> {    
   const card= this.cartaoRepository.insertCartao(cartao,idCiclista)   
    return card
  }

  async updateCartao(id: number, cartao: novoCartao): Promise<Cartao> {
   
   
    const update= await this.cartaoRepository.updateCartao(id,cartao)
    if(this.utils.checkNullOrBlank(update)){

      throw new NotFoundException("Não encontrado")
  }

    return update
  
  }



  async getCartaoByID(id: number): Promise<Cartao> {
    
    
    const update= await this.cartaoRepository.getCartaoByID(id)
    if(this.utils.checkNullOrBlank(update)){
      throw new NotFoundException("Não encontrado")
  }

    return update
  
  }


}


          