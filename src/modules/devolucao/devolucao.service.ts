import { Injectable, NotFoundException  } from '@nestjs/common';
import { NovaDevolucao } from "../../dto/novaDevolucao.dto";
import { DevolucaoRepository } from './devolucao.repository';
import {Utils} from '../../common/utils';
import { Devolucao } from '../../schemas/devolucao.schema';
import {realizaCobrança} from "../../dto/realizaCobranca.dto";
import { CiclistaService } from '../ciclista/ciclista.service';
import { emails } from '../../common/emails/emails';
import { Api } from '../../common/api';
import { AluguelService } from '../aluguel/aluguel.service';
@Injectable()
export class DevolucaoService {
  constructor(
    private readonly devolucaoRepository:DevolucaoRepository,
    private readonly utils:Utils,
    private readonly api:Api,
    private readonly ciclistaService:CiclistaService,
    private readonly aluguelService:AluguelService
  ) {}

  async insertDevolucao(devolucao: NovaDevolucao): Promise<Devolucao> {
     console.log(await this.aluguelService.getAluguelByCiclista(40))
    const alugado = new Devolucao;
    const cobrança= new realizaCobrança()
    cobrança.ciclista=  devolucao.ciclista
    cobrança.valor=  30
    const ciclista= await this.ciclistaService.getCiclistaByID(devolucao.ciclista)
    if(this.utils.checkNullOrBlank(ciclista) ){
      throw new NotFoundException("Ciclista não encontrado")
  }
    const email= ciclista.email
    const tranca= await this.api.getTrancaByid(devolucao.trancaFim)
    console.log("tranca",tranca)
    alugado.horaFim= await this.utils.getData()
    const Aluguel = await this.aluguelService.getAluguelByCiclista(devolucao.ciclista)
    if(this.utils.checkNullOrBlank(Aluguel) ){
      throw new NotFoundException("Aluguel não encontrado")
  }
    console.log("Aluguel",Aluguel)
    const fimCobrança= await this.realizaCobrança(devolucao, alugado.horaFim, Aluguel.horaInicio)
    await this.api.trancarTranca(devolucao.trancaFim,Aluguel.bicicleta)
    await this.api.sendEmail( {...emails.devolucao,email})
    
    alugado.bicicleta= Aluguel.bicicleta
    alugado.ciclista= devolucao.ciclista
    alugado.cobranca= fimCobrança.id
    alugado.horaInicio=Aluguel.horaInicio
    alugado.trancaInicio=Aluguel.trancaInicio
    alugado.trancaFim=tranca.id

    Aluguel.horaFim=alugado.horaFim
    Aluguel.trancaFim=alugado.trancaFim
    console.log("alugado",alugado)
    const updateAluguel= await this.aluguelService.updateAluguel(devolucao.ciclista,Aluguel)
    console.log("updateAluguel",Aluguel)
    const devolucaoResult=await this.devolucaoRepository.insertDevolucao(alugado)
    return devolucaoResult
  
    
}

async realizaCobrança(devolucao: NovaDevolucao,horaInicio: string,horaFim: string): Promise<any> {

  const currentDate1 = new Date(horaInicio); // Primeira data em formato ISO
const currentDate2 = new Date(horaFim); // Segunda data em formato ISO

const diffInMinutes = Math.abs(currentDate2.getTime() - currentDate1.getTime()) / 60000; // Calcula a diferença em minutos
console.log(diffInMinutes)
console.log(diffInMinutes % 30)
  const cobrança= new realizaCobrança()
    cobrança.ciclista=  devolucao.ciclista
    cobrança.valor=  5 * (Math.floor(diffInMinutes/30))
    console.log("obrança.valor",cobrança.valor)
 return await  this.api.realizaCobrançaFila(cobrança)
}

async trancarTranca(id: number): Promise<any> {
   
  
  return true
  }
  

}


          