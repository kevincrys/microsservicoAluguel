import axios from 'axios';
import { Api } from './Api';
import { novoCartao } from 'src/dto/novoCartao.dto';


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
  });


});