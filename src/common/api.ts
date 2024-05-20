import { novoCartao } from 'src/dto/novoCartao.dto';
import { Bicicleta } from 'src/schemas/bicicleta.schema';
import { enviaEmail } from 'src/dto/enviaEmail.dto';
import { realizaCobrança } from 'src/dto/realizaCobranca.dto';
import { Tranca } from 'src/schemas/trancas.schemas';
import { UnprocessableEntityException } from '@nestjs/common';
const axios = require('axios');
const urlexterno = 'https://externo-pm.onrender.com';
const equipamento = 'https://ms-equipamento.vercel.app';
export class Api {
  async validaCartao(cartao: novoCartao): Promise<boolean> {
    return true;
  }
  async sendEmail(enviaEmail: enviaEmail): Promise<boolean> {
    const url = `${urlexterno}/enviarEmail`;
    try {
      const response = await axios.post(url, enviaEmail, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {}
    return true;
  }

  async getBicicletaByid(id: number): Promise<Bicicleta> {
    // /bicicleta/{idBicicleta}:

    let bike: Bicicleta;
    const url = `${equipamento}/bicicleta/${id}`;
    try {
      const response = await axios.get(url);

      bike = response.data;
    } catch (error) {
      console.error('Erro:', error);
    }
    return bike;
  }
  async getTrancaByid(id: number): Promise<Tranca> {
    // /bicicleta/{idBicicleta}:

    let tranca: Tranca;
    const url = `${equipamento}/tranca/${id}`;
    try {
      const response = await axios.get(url);

      tranca = response.data;
      return tranca;
    } catch (error) {
      throw new UnprocessableEntityException(error?.response?.data?.message);
    }
  }

  async destrancaTranca(id: number, idbicicleta: number): Promise<any> {
    const url = `${equipamento}/tranca/${id}/destrancar`;
    const data = {
      bicicletaId: idbicicleta,
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException(error?.response?.data?.message);
    }
  }
  async trancarTranca(id: number, idbicicleta: number): Promise<any> {
    const url = `${equipamento}/tranca/${id}/trancar`;
    const data = {
      bicicletaId: idbicicleta,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new UnprocessableEntityException(error?.response?.data?.message);
    }
  }

  async realizaCobrança(aluguel: realizaCobrança): Promise<any> {
    console.log('realizaCobrança', aluguel);

    const url = `${urlexterno}/cobranca`;

    try {
      const response = await axios.post(url, aluguel, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta:', response.data);
      return response.data;
    } catch (error) {
      console.log(error?.response.data.Mensagem);
      throw new UnprocessableEntityException(
        `realizaCobrança ${
          error?.response?.data?.message || error?.response?.data?.Mensagem
        }`,
      );
    }
  }

  async realizaCobrançaFila(aluguel: realizaCobrança): Promise<any> {
    console.log('realizaCobrança');

    const url = `${urlexterno}/filaCobranca`;

    try {
      const response = await axios.post(url, aluguel, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta:', response.data);
      return response.data;
    } catch (error) {
      throw new UnprocessableEntityException(error?.response?.data?.message);
    }
  }
}
