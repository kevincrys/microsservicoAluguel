import {Injectable, NotFoundException, UnprocessableEntityException  } from '@nestjs/common';
import { NovoAluguel } from "../../dto/novoAluguel.dto";
import { AluguelRepository } from './aluguel.repository';
import {Utils} from '../../common/utils';
import { Aluguel } from '../../schemas/aluguel.schema';
import {realizaCobrança} from "../../dto/realizaCobranca.dto";
import { CiclistaService } from '../ciclista/ciclista.service';
import { emails } from '../../common/emails/emails';
import { Api } from '../../common/api';
@Injectable()
export class AluguelService {
  constructor(
    private readonly aluguelRepository:AluguelRepository,
    private readonly utils:Utils,
    private readonly api:Api,
    private readonly ciclistaService:CiclistaService
  ) {}

  async insertAluguel(aluguel: NovoAluguel): Promise<Aluguel> {
    const alugado = new Aluguel;
    const cobrança= new realizaCobrança()
    cobrança.ciclista=  aluguel?.ciclista
    cobrança.valor=10
    const ciclista= await this.ciclistaService.getCiclistaByID(aluguel?.ciclista)
    console.log("ciclista",ciclista)
    if(this.utils.checkNullOrBlank(ciclista) ){
      throw new NotFoundException("Ciclista não encontrado")
  }
    const email= ciclista?.email
    const tranca= await this.api.getTrancaByid(aluguel.trancaInicio)
    console.log("tranca",tranca)
    const fimCobrança= await this.api.realizaCobrança(cobrança)
    console.log("fimCobrança",fimCobrança)
    console.log("destrancaTranca",aluguel?.trancaInicio,tranca?.bicicletaId)
   
    await  this.api.destrancaTranca(aluguel?.trancaInicio,tranca?.bicicletaId)
    await this.api.sendEmail( {...emails?.aluguel,email})
    alugado.bicicleta= tranca?.bicicletaId
    alugado.ciclista= aluguel?.ciclista
    alugado.cobranca= fimCobrança?.id
    alugado.horaInicio= await  this.utils.getData()
    alugado.trancaInicio=tranca?.id

    const aluguelResult= this.aluguelRepository.insertAluguel(alugado)
    return aluguelResult
  
    
}

async permiteAluguel(id: number): Promise<Boolean> {
  const update= await this.aluguelRepository.permiteAluguel(id)
  return update

}


async getBikeByCiclista(id: number): Promise<number> {
  const update= await this.aluguelRepository.getBikeByCiclista(id)
  return update

}
async getAluguelByCiclista(id: number): Promise<Aluguel> {
  const update= await this.aluguelRepository.getAluguelByCiclista(id)
  return update

}

async updateAluguel(id: number, aluguel: Aluguel): Promise<Aluguel> {
   
  const update= await this.aluguelRepository.updateAluguel(id,aluguel)
  if(update === undefined){throw new NotFoundException("Não encontrado")}
  return update

}

}


          