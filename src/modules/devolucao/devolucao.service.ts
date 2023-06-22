import { Injectable, NotFoundException  } from '@nestjs/common';
import { NovaDevolucao } from "../../dto/novaDevolucao.dto";
import { DevolucaoRepository } from './devolucao.repository';
import {Utils} from '../../common/utils';
import { Devolucao } from '../../schemas/devolucao.schema';
import {realizaCobrança} from "../../dto/realizaCobranca.dto";
import { enviaEmail } from '../../dto/enviaEmail.dto';
import { CiclistaService } from '../ciclista/ciclista.service';
import { emails } from '../../common/emails/emails';
import { Tranca } from '../../schemas/trancas.schemas';
import { statusTranca } from '../../enums/statusTranca.enum';
@Injectable()
export class DevolucaoService {
  constructor(
    private readonly devolucaoRepository:DevolucaoRepository,
    private readonly utils:Utils,
    private readonly ciclistaService:CiclistaService
  ) {}

  async insertDevolucao(devolucao: NovaDevolucao): Promise<Devolucao> {
    const alugado = new Devolucao;
    const cobrança= new realizaCobrança()
    cobrança.ciclista=  devolucao.ciclista
    cobrança.valor=  30
    const ciclista= await this.ciclistaService.getCiclistaByID(devolucao.ciclista)
    if(this.utils.checkNullOrBlank(ciclista) ){
      throw new NotFoundException("Ciclista não encontrado")
  }
    const email= ciclista.email
    const tranca= await this.mocktrancas(1)
    const fimCobrança= await this.realizaCobrança(cobrança)
    this.trancarTranca(devolucao.trancaFim)
    this.enviaEmail( {...emails.devolucao,email})
    alugado.bicicleta= tranca.bicicleta
    alugado.ciclista= devolucao.ciclista
    alugado.cobranca= fimCobrança
    alugado.horaFim= await this.utils.getData()
    alugado.trancaFim=tranca.id
    const devolucaoResult=  this.devolucaoRepository.insertDevolucao(alugado)
    return devolucaoResult
  
    
}
async mocktrancas(id: number): Promise<Tranca> {
   
  const trancas =[
    {
      id: 1,
      bicicleta: 123,
      numero: 456,
      localizacao: "Localização 1",
      anoDeFabricacao: "2022",
      modelo: "Modelo 1",
      status: statusTranca.OCUPADA,
    },
    {
      id: 2,
      bicicleta: 789,
      numero: 101112,
      localizacao: "Localização 2",
      anoDeFabricacao: "2021",
      modelo: "Modelo 2",
      status: statusTranca.OCUPADA,
    },
  ]
  return trancas[id]
}

async realizaCobrança(devolucao: realizaCobrança): Promise<any> {
   return 1
}
async enviaEmail(devolucao: enviaEmail): Promise<any> {
   
  
return true
}
async trancarTranca(id: number): Promise<any> {
   
  
  return true
  }
  

}


          