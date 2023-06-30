
import { Cartao } from "src/schemas/cartao.schema";
import { novoCartao } from "../../dto/novoCartao.dto";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

let cartaosNovos: Cartao[] = []
@Injectable()
export class CartaoRepository{
    constructor(
        @InjectRepository(Cartao)
        private cartaoRepository: Repository<Cartao>,
      ) {}
async insertCartao (cartao: novoCartao): Promise<Cartao> {
    const check= await this.cartaoRepository.findOneBy({numero: cartao.numero})
    if(!check){
    const card= await this.cartaoRepository.save(cartao);
    return card
    }

}


async updateCartao (id: number, cartao: novoCartao): Promise<Cartao> {
        await this.cartaoRepository.update(id, cartao)
        return await this.cartaoRepository.findOneBy({id: id})
}

async getCartaos (): Promise<Cartao[]> {
            return  await this.cartaoRepository.find()
        }

async getCartaoByID (id: number): Promise<Cartao> {
            return  await this.cartaoRepository.findOneBy({id: id})
        }
}

