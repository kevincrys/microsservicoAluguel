import { statusCiclista } from "../../enums/statusCiclista.enum";
import { Ciclista } from "../../schemas/ciclista.schema";
import { novoCiclista } from "../../dto/novoCiclista.dto";
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CiclistaRepository {
    constructor(
        @InjectRepository(Ciclista)
        private ciclistaRepository: Repository<Ciclista>,
      ) {}

async insertCiclista (ciclista: novoCiclista): Promise<Ciclista> {
    var insertCiclista={...ciclista,status:statusCiclista.AGUARDANDO}
    

    const clic= await this.ciclistaRepository.save(insertCiclista);
    return clic
    
}


async updateCiclista (id: number, ciclista: novoCiclista): Promise<Ciclista> {
    await this.ciclistaRepository.update(id, ciclista)
    await this.ciclistaRepository.save(ciclista)
    return await this.ciclistaRepository.findOneBy({id: id})
}

async deleteCiclista (id: number): Promise<boolean> {
    const ciclistaBefore= await this.getCiclistaByID(id)
    if(ciclistaBefore===null){
        return false
    }
    else{
        
        await this.ciclistaRepository.delete(id);
        return true
    }
}

async getCiclistas (): Promise<Ciclista[]> {
    return  await this.ciclistaRepository.find()
        }

async getCiclistaByID (id: number): Promise<Ciclista> {
    const ciclista= await this.ciclistaRepository
    .createQueryBuilder('ciclista')
    .leftJoinAndSelect('ciclista.passaporte', 'passaporte')
    .where('ciclista.id = :id', { id })
    .getOne();
    return  ciclista

        }

async checkEmail (email: string): Promise<Boolean> {
    const checkEmail= await this.ciclistaRepository.findOneBy({email: email})
    if(checkEmail===null){
        return true
    }
    return false

}

        async ativarCiclista (id: number): Promise<boolean> {
            var ciclista = await this.getCiclistaByID(id)
            if (ciclista===null){
                return false
            }
            ciclista.status= statusCiclista.ATIVO
            const update= await this.updateCiclista(id,ciclista)
             if (update===null){
                return false
            }
             return true
        }
            


  

}

