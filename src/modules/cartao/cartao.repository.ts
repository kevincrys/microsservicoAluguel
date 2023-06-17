
import { Cartao } from "src/schemas/cartao.schema";
import { novoCartao } from "../../dto/novoCartao.dto";


let cartaosNovos: Cartao[] = []
export class CartaoRepository{
    
async insertCartao (cartao: novoCartao): Promise<Cartao> {
    var id=Math.random()
    cartaosNovos.push({ ...cartao, id})
    return { ...cartao, id}
}


async updateCartao (id: number, cartao: novoCartao): Promise<Cartao> {
    var cartaosArray= await this.getCartaos()
    const index = cartaosArray.findIndex((cartao) => cartao.id === id)
    if (index !== -1) {
        const cartaoAdd={ ...cartao, id }
        cartaosNovos[index] = cartaoAdd
        return cartaoAdd
      }
      return undefined
}

// async deleteCartao (id: number): Promise<boolean> {
//     var cartaosArray= await this.getCartaos()
//     const beforeLenght = cartaosArray.length
//     cartaosNovos = cartaosArray.filter((cartao) => cartao.id !== id)
//     return beforeLenght !== cartaosArray.length
//     }

async getCartaos (): Promise<Cartao[]> {
            return  cartaosNovos
        }

async getCartaoByID (id: number): Promise<Cartao> {
    var cartaosArray= await this.getCartaos()
            return  cartaosArray.find((cartao) => cartao.id === id)
        }
}

