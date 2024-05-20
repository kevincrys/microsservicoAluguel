/* eslint-disable @typescript-eslint/ban-types */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { novoCiclista } from '../../dto/novoCiclista.dto';
import { CiclistaRepository } from './ciclista.repository';
import { Utils } from '../../common/utils';
import { Ciclista } from '../../schemas/ciclista.schema';
import { CadastroCiclista } from '../../dto/cadastroCiclista.dto';
import { CartaoService } from '../cartao/cartao.service';
import { emails } from '../../common/emails/emails';
import { AluguelRepository } from '../aluguel/aluguel.repository';

import { Bicicleta } from '../../schemas/bicicleta.schema';

import { Api } from '../../common/api';
@Injectable()
export class CiclistaService {
  constructor(
    private readonly ciclistaRepository: CiclistaRepository,
    private readonly utils: Utils,
    private readonly api: Api,
    private readonly cartaoService: CartaoService,
    private readonly aluguelRepository: AluguelRepository,
  ) {}

  async insertCiclista(ciclista: CadastroCiclista): Promise<Ciclista> {
    if (await this.api.validaCartao(ciclista.meioDePagamento)) {
      const check = await this.ciclistaRepository.insertCiclista(
        ciclista.ciclista,
      );
      if (check === undefined) {
        throw new NotFoundException('Requisição mal formada');
      }
      const card = await this.cartaoService.insertCartao(
        ciclista.meioDePagamento,
        check.id,
      );

      const emailContent = emails.cadastroCiclista;
      const email = ciclista.ciclista.email;

      this.api.sendEmail({ ...emailContent, email });
      return check;
    } else {
      throw new NotFoundException('Requisição mal formada');
    }
  }

  async updateCiclista(id: number, ciclista: novoCiclista): Promise<Ciclista> {
    const update = await this.ciclistaRepository.updateCiclista(id, ciclista);
    if (update === undefined) {
      throw new NotFoundException('Não encontrado');
    }
    return update;
  }

  async ativarCiclista(id: number): Promise<boolean> {
    const update = await this.ciclistaRepository.ativarCiclista(id);
    if (update === true) {
      return update;
    } else {
      throw new NotFoundException('Não encontrado');
    }
  }

  async deleteCiclista(id: number): Promise<boolean> {
    const update = await this.ciclistaRepository.deleteCiclista(id);
    if (update === false) {
      throw new NotFoundException('Não encontrado');
    }
    return true;
  }
  async getCiclistaByID(id: number): Promise<Ciclista> {
    const update = await this.ciclistaRepository.getCiclistaByID(id);
    if (update === null) {
      throw new NotFoundException('Não encontrado');
    }

    return update;
  }
  async checkEmail(email: string): Promise<Boolean> {
    if (this.utils.checkNullOrBlank(email)) {
      throw new BadRequestException('Email não enviado como parâmetro');
    }
    const update = await this.ciclistaRepository.checkEmail(email);

    return update;
  }

  async permiteAluguel(id: number): Promise<Boolean> {
    const getCiclistas = this.getCiclistaByID(id);
    if (this.utils.checkNullOrBlank(getCiclistas)) {
      throw new NotFoundException('Não encontrado');
    }
    const update = await this.aluguelRepository.permiteAluguel(id);

    return update;
  }

  async getBikeByCiclista(id: number): Promise<Bicicleta> {
    const getCiclistas = await this.getCiclistaByID(id);

    if (this.utils.checkNullOrBlank(getCiclistas)) {
      throw new NotFoundException('Ciclista não encontrado');
    }
    const update = await this.aluguelRepository.getBikeByCiclista(id);

    if (this.utils.checkNullOrBlank(update)) {
      return;
    }

    const getBike = await this.api.getBicicletaByid(update);
    return getBike;
  }
  async getCiclistas(): Promise<Ciclista[]> {
    const array = await this.ciclistaRepository.getCiclistas();

    return array;
  }
}
