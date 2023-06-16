
import { Cartao } from "src/schemas/cartao.schema";
import { novoCartao } from "../../dto/novoCartao.dto";


let cartaosNovos: Cartao[] = []
export class CartaoRepository{
    
async insertcartao (cartao: novoCartao) {
    var id=Math.random()
    cartaosNovos.push({ ...cartao, id})
}


async updatecartao (id: number, cartao: novoCartao): Promise<boolean> {
    const index = cartaosNovos.findIndex((cartao) => cartao.id === id)
    if (index !== -1) {
        cartaosNovos[index] = { ...cartao, id }
        return true
      }
      return false
}

async deletecartao (id: number): Promise<boolean> {
    const beforeLenght = cartaosNovos.length
    cartaosNovos = cartaosNovos.filter((cartao) => cartao.id !== id)
    return beforeLenght !== cartaosNovos.length
    }

async getcartaos (): Promise<Cartao[]> {
            return  cartaosNovos
        }

async getcartaoByID (id: number): Promise<Cartao> {
            return  cartaosNovos.find((cartao) => cartao.id === id)
        }
}

