import {Injectable, NotFoundException  } from '@nestjs/common';
import { NovoAluguel } from "../../dto/novoAluguel.dto";
import { AluguelRepository } from './aluguel.repository';
import {Utils} from '../../common/utils';
import { Aluguel } from '../../schemas/aluguel.schema';
import {realizaCobrança} from "../../dto/realizaCobranca.dto";
import { enviaEmail } from '../../dto/enviaEmail.dto';
import { CiclistaService } from '../ciclista/ciclista.service';
import { emails } from '../../common/emails/emails';
import { Tranca } from 'src/schemas/trancas.schemas';
import { statusTranca } from '../../enums/statusTranca.enum';
import { Api } from 'src/common/api';
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
    cobrança.valor=  30
    const ciclista= await this.ciclistaService.getCiclistaByID(aluguel?.ciclista)
    if(this.utils.checkNullOrBlank(ciclista) ){
      throw new NotFoundException("Ciclista não encontrado")
  }
    const email= ciclista?.email
    const tranca= await this.mocktrancas(1)
    const fimCobrança= await this.realizaCobrança(cobrança)
    this.destrancaTranca(aluguel?.trancaInicio)
    this.api.sendEmail( {...emails?.aluguel,email})
    alugado.bicicleta= tranca?.bicicleta
    alugado.ciclista= aluguel?.ciclista
    alugado.cobranca= fimCobrança
    alugado.horaInicio= await  this.utils.getData()
    alugado.trancaInicio=tranca?.id

    const aluguelResult= this.aluguelRepository.insertAluguel(alugado)
    return aluguelResult
  
    
}
async mocktrancas(id: number): Promise<Tranca> {
   
  const trancas =[
    {
      id: 1,
      bicicleta: 7,
      numero: 456,
      localizacao: "Localização 1",
      anoDeFabricacao: "2022",
      modelo: "Modelo 1",
      status: statusTranca.OCUPADA,
    },
    {
      id: 2,
      bicicleta: 7,
      numero: 101112,
      localizacao: "Localização 2",
      anoDeFabricacao: "2021",
      modelo: "Modelo 2",
      status: statusTranca.OCUPADA,
    },
  ]
return trancas[id]
}

async permiteAluguel(id: number): Promise<Boolean> {
  const update= await this.aluguelRepository.permiteAluguel(id)
  return update

}


async getBikeByCiclista(id: number): Promise<number> {
  const update= await this.aluguelRepository.getBikeByCiclista(id)
  return update

}
async realizaCobrança(aluguel: realizaCobrança): Promise<any> {
   return 1
}
async destrancaTranca(id: number): Promise<any> {
   
  
  return true
  }


}


          