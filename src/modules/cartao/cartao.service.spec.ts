import { NotFoundException } from '@nestjs/common';
import { CartaoService } from './cartao.service';
import { CartaoRepository } from './cartao.repository';
import { Utils } from '../../common/utils';

describe('CartaoService', () => {
  let service: CartaoService;
  let repository: CartaoRepository;
  let utils: Utils;

  beforeEach(() => {
    repository = new CartaoRepository();
    utils = new Utils();
    service = new CartaoService(repository, utils);
  });

  describe('insertcartao', () => {
    it('should insert cartao', async () => {
      const cartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      };

      const result = await service.insertcartao(cartao);

      expect(result).toBe(true);
      expect(repository.getcartaoByID(1)).toEqual({
        id: 1,
        ...cartao,
      });
    });

    it('should not insert cartao if cartao is null or blank', async () => {
      const cartao = null;

      const result = await service.insertcartao(cartao);

      expect(result).toBeUndefined();
      expect(repository.getcartaoByID(1)).toBeUndefined();
    });
  });

  describe('updatecartao', () => {
    it('should update cartao', async () => {
      const cartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      };
      repository.insertcartao(cartao);

      const updatedCartao = {
        nomeTitular: 'Jane Smith',
        numero: '9876543210',
        validade: '01/26',
        cvv: '456',
      };

      const result = await service.updatecartao(1, updatedCartao);

      expect(result).toBe(true);
      expect(repository.getcartaoByID(1)).toEqual({
        id: 1,
        ...updatedCartao,
      });
    });

    it('should throw NotFoundException if cartao is not found', async () => {
      const cartao = {
        nomeTitular: 'Jane Smith',
        numero: '9876543210',
        validade: '01/26',
        cvv: '456',
      };

      expect(service.updatecartao(1, cartao)).rejects.toThrowError(NotFoundException);
    });

    it('should not update cartao if cartao is null or blank', async () => {
      const cartao = null;
      repository.insertcartao({
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      });

      const result = await service.updatecartao(1, cartao);

      expect(result).toBeUndefined();
      expect(repository.getcartaoByID(1)).toEqual({
        id: 1,
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      });
    });
  });

  describe('getcartaoByID', () => {
    it('should get cartao by ID', async () => {
      const cartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      };
      repository.insertcartao(cartao);

      const result = await service.getcartaoByID(1);

      expect(result).toEqual({
        id: 1,
        ...cartao,
      });
    });

    it('should throw NotFoundException if cartao is not found', async () => {
      expect(service.getcartaoByID(1)).rejects.toThrowError(NotFoundException);
    });
  });
});