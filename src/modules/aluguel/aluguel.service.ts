import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { NovoAluguel } from "../../dto/novoAluguel.dto";
import { AluguelRepository } from './aluguel.repository';
import {Utils} from '../../common/utils';
import { Aluguel } from 'src/schemas/Aluguel.schema';
import {realizaCobrança} from "../../dto/realizaCobranca";
import { CartaoService } from '../cartao/cartao.service';
import { enviaEmail } from 'src/dto/enviaEmail';
import { CiclistaService } from '../ciclista/ciclista.service';
import { emails } from 'src/common/emails/emails';
@Injectable()
export class AluguelService {
  constructor(
    private readonly aluguelRepository:AluguelRepository,
    private readonly utils:Utils,
    private readonly cartaoService:CartaoService,
    private readonly ciclistaService:CiclistaService
  ) {}

  async insertAluguel(aluguel: NovoAluguel): Promise<Boolean> {
    const alugado = new Aluguel;
    const cobrança= new realizaCobrança()
    cobrança.ciclista=  aluguel.ciclista
    cobrança.valor=  30
    const ciclista= await this.ciclistaService.getCiclistaByID(aluguel.ciclista)
    const email= ciclista.email
    const tranca= {
      id: 1,
      bicicleta: 123,
      numero: 456,
      localizacao: "Localização 1",
      anoDeFabricacao: "2022",
      modelo: "Modelo 1",
      status: "Ativo",
    }
    const fimCobrança= await this.realizaCobrança(cobrança)
    this.destrancaTranca(aluguel.trancaInicio)
    this.enviaEmail( {...emails.aluguel,email})
    alugado.bicicleta= tranca.bicicleta
    alugado.ciclista= aluguel.ciclista
    alugado.cobranca= fimCobrança
    alugado.horaInicio= Date()
    alugado.trancaInicio=tranca.id
    this.aluguelRepository.insertAluguel(alugado)
    return true
  
    
}
async mocktrancas(id: number): Promise<any> {
   
  const trancas =[
    {
      id: 1,
      bicicleta: 123,
      numero: 456,
      localizacao: "Localização 1",
      anoDeFabricacao: "2022",
      modelo: "Modelo 1",
      status: "Ativo",
    },
    {
      id: 2,
      bicicleta: 789,
      numero: 101112,
      localizacao: "Localização 2",
      anoDeFabricacao: "2021",
      modelo: "Modelo 2",
      status: "Inativo",
    },
    {
      id: 3,
      bicicleta: 131415,
      numero: 161718,
      localizacao: "Localização 3",
      anoDeFabricacao: "2023",
      modelo: "Modelo 3",
      status: "Em manutenção",
    },
    {
      id: 4,
      bicicleta: 192021,
      numero: 222324,
      localizacao: "Localização 4",
      anoDeFabricacao: "2020",
      modelo: "Modelo 4",
      status: "Disponível",
    },
  ]
  const trancaEscolhida=  trancas.find((tranca) => tranca.id === id)
}

async realizaCobrança(aluguel: realizaCobrança): Promise<any> {
   return 1
}
async enviaEmail(aluguel: enviaEmail): Promise<any> {
   
  
return true
}
async destrancaTranca(id: number): Promise<any> {
   
  
  return true
  }

}


          