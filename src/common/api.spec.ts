import axios from 'axios';
import { Api } from './Api';
import { novoCartao } from 'src/dto/novoCartao.dto';
import { enviaEmail } from 'src/dto/enviaEmail.dto';
import { Bicicleta } from 'src/schemas/bicicleta.schema';
import { Tranca } from 'src/schemas/trancas.schemas';
import { statusTranca } from '../enums/statusTranca.enum';


jest.mock('axios');

describe('Api', () => {
  let api: Api;

  beforeEach(() => {
    api = new Api();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('validaCartao', () => {
    it('deve retornar true quando a validação do cartão for bem-sucedida', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 200 })


      const cartao: novoCartao = {
        nomeTitular: 'Teste',
        numero: '0000000000000000',
        validade: '12/20',
        cvv: '123'

      };

      const result = await api.validaCartao(cartao);

      expect(result).toBe(true);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/validaCartaoDeCredito'), cartao, expect.any(Object));
    });


    describe('sendEmail', () => {
        it('deve retornar true quando o envio de email for bem-sucedido', async () => {
          const mockResponse = { status: 200 };
    
          axios.post = jest.fn().mockResolvedValue(mockResponse);
    
          const email: enviaEmail = {
            email:"teste",
            assunto: 'Teste',
            mensagem: 'Teste',
           };
    
          const result = await api.sendEmail(email);
    
          expect(result).toBe(true);
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/enviarEmail'), email, expect.any(Object));
        });
      });
    
      describe('getBicicletaByid', () => {
        it('deve retornar a bicicleta correta quando o ID for válido', async () => {
          const bicicletaMock: Bicicleta = { 
            marca: 'teste',
            modelo: 'teste',
            ano: 'teste',
            numero: 'teste',
            status: 'teste',
            id: 1
          }


          const id = 1;
          const mockResponse = { data: bicicletaMock };
    
          axios.get = jest.fn().mockResolvedValue(mockResponse);
    
          const result = await api.getBicicletaByid(id);
    
          expect(result).toEqual(bicicletaMock);
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/bicicleta/${id}`));
        });
      });
    
      describe('getTrancaByid', () => {
        it('deve retornar a tranca correta quando o ID for válido', async () => {
          const trancaMock: Tranca = { 
            numero: 1,
            localizacao: 'teste',
            anoDeFabricacao: 'teste',
            modelo: 'teste',
            status: statusTranca.LIVRE,
            id: 1,
            bicicletaId: 1
           };

          const id = 1;
          const mockResponse = { data: trancaMock };
    
          axios.get = jest.fn().mockResolvedValue(mockResponse);
    
          const result = await api.getTrancaByid(id);
    
          expect(result).toEqual(trancaMock);
          expect(axios.get).toHaveBeenCalledTimes(1);
          expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/tranca/${id}`));
        });
      });
    
      describe('destrancaTranca', () => {
        it('deve realizar o destrancamento da tranca corretamente', async () => {
          const id = 1;
          const bicicletaId = 2;
          const mockResponse = { status: 200 };
    
          axios.post = jest.fn().mockResolvedValue(mockResponse);
    
          await expect(api.destrancaTranca(id, bicicletaId)).resolves.not.toThrow();
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`/tranca/${id}/destrancar`), { bicicletaId }, expect.any(Object));
        });
      });
    
      describe('trancarTranca', () => {
        it('deve realizar o trancamento da tranca corretamente', async () => {
          const id = 1;
          const bicicletaId = 2;
          const mockResponse = { status: 200 };
    
          axios.post = jest.fn().mockResolvedValue(mockResponse);
    
          await expect(api.trancarTranca(id, bicicletaId)).resolves.not.toThrow();
          expect(axios.post).toHaveBeenCalledTimes(1);
          expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`/tranca/${id}/trancar`), { bicicletaId }, expect.any(Object));
        });
      });




  });


});