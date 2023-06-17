import { CartaoService } from './cartao.service';
import { NotFoundException } from '@nestjs/common';

describe('CartaoService', () => {
  let service: CartaoService;
  let cartaoRepository: any;
  let utils: any;

  beforeEach(() => {
    cartaoRepository = {
      insertCartao: jest.fn(),
      updateCartao: jest.fn(),
      deleteCartao: jest.fn(),
      getCartaoByID: jest.fn(),
      getCartaos: jest.fn(),
    };

    utils = {
      checkNullOrBlank: jest.fn(),
    };

    service = new CartaoService(cartaoRepository, utils);
  });

  describe('insertCartao', () => {
    it('should insert Cartao', async () => {
      const novoCartao =  {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };
      ;

      await service.insertCartao(novoCartao);

      expect(cartaoRepository.insertCartao).toHaveBeenCalledWith(novoCartao);
    });
  });

  describe('updateCartao', () => {
    it('should update Cartao', async () => {
      const id = 1;
      const novoCartao =  {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };
      ;

      utils.checkNullOrBlank.mockReturnValue(false);
      cartaoRepository.updateCartao.mockReturnValue({});

      await service.updateCartao(id, novoCartao);

      expect(cartaoRepository.updateCartao).toHaveBeenCalledWith(id, novoCartao);
    });

    it('should throw NotFoundException when Cartao is not found', async () => {
      const id = 12;
      const novoCartao =  {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };
      ;

      utils.checkNullOrBlank = jest.fn().mockReturnValue(true);
      cartaoRepository.updateCartao.mockReturnValue(undefined);

     

      expect(service.updateCartao(id, novoCartao)).rejects.toThrow(NotFoundException);
    });
  });



  describe('getCartaoByID', () => {
    it('should return Cartao by id', async () => {
      const id = 1234;
      const cartao = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
        matricula: id,
      };

      utils.checkNullOrBlank.mockReturnValue(false);
      cartaoRepository.getCartaoByID.mockReturnValue(cartao);

      const result = await service.getCartaoByID(id);

      expect(result).toEqual(cartao);
      expect(cartaoRepository.getCartaoByID).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when Cartao is not found', async () => {
      const id = 1234;

      utils.checkNullOrBlank.mockReturnValue(true);
      cartaoRepository.getCartaoByID.mockReturnValue(undefined);

      await expect(service.getCartaoByID(id)).rejects.toThrow(NotFoundException);
    });

    it('should not getCartaoByID when id is null or blank', async () => {
      const id = null;

      utils.checkNullOrBlank.mockReturnValue(true);

     

      await expect(service.getCartaoByID(id)).rejects.toThrow(NotFoundException);
    });
  });

});