import { HttpStatus } from '@nestjs/common';
import { CartaoController } from './cartao.controller';
import { CartaoService } from './cartao.service';
import { Response } from 'express';

describe('CartaoController', () => {
  let controller: CartaoController;
  let service: CartaoService;


  describe('cadastrarcartao', () => {
    it('should insert cartao and return success response', async () => {
      const novocartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      };
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      const result = await controller.cadastrarcartao(novocartao, res);

      expect(result).toBeUndefined();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(true);
      expect(service.insertcartao).toHaveBeenCalledWith(novocartao);
    });
  });

  describe('updatecartao', () => {
    it('should update cartao and return success response', async () => {
      const novocartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890',
        validade: '12/24',
        cvv: '123',
      };
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;
      const id = '1';
      const idbicicleta = parseInt(id);

      const result = await controller.updatecartao(novocartao, res, id);

      expect(result).toBeUndefined();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(true);
      expect(service.updatecartao).toHaveBeenCalledWith(idbicicleta, novocartao);
    });
  });

  describe('getcartaoByID', () => {
    it('should get cartao by ID and return success response', async () => {
        const res: Response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
          } as any;
      const id = '1';
      const idbicicleta = parseInt(id);

      const result = await controller.getcartaoByID(res, id);

      expect(result).toBeUndefined();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(service.getcartaoByID(idbicicleta));
    });
  });
});