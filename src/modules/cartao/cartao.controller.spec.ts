import { Test, TestingModule } from '@nestjs/testing';
import { CartaoController } from './cartao.controller';
import { CartaoService } from './cartao.service';
import { novoCartao } from '../../dto/novoCartao.dto';

import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

import { CartaoModule } from '../cartao/cartao.module';
import { CartaoRepository } from './cartao.repository';
import { Utils } from '../../common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from '../../schemas/cartao.schema';
import { mockDatabaseConfig } from '../../mockdatabase.config';

const newCartao=  {
  nomeTitular: 'John Doe',
  numero: '1231231231',
  validade: '12/23',
  cvv: '123',
}
  const CartaoReturn=  {
    id:1,
    nomeTitular: 'John Doe',
    numero: '1231231231',
    validade: '12/23',
    cvv: '123',
  }

describe('CartaoController', () => {
  let controller: CartaoController;
  let service: CartaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CartaoModule,TypeOrmModule.forFeature([Cartao]),TypeOrmModule.forRoot(mockDatabaseConfig)],
      controllers: [CartaoController],
      providers: [CartaoService, CartaoRepository, Utils],
      exports: [CartaoService, Utils],
    }).compile();


    controller = module.get<CartaoController>(CartaoController);
    service = module.get<CartaoService>(CartaoService);
  });

  describe('updateCartao', () => {
    it('should call updateCartao in the service and return response from service', async () => {
      const id = 1;
      const novoCartao: novoCartao = newCartao;
      const response = CartaoReturn 
      
      jest.spyOn(service, 'updateCartao').mockResolvedValue(CartaoReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.updateCartao(novoCartao, res, id);

      expect(service.updateCartao).toHaveBeenCalledWith(id, novoCartao);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });



  describe('getCartaoByID', () => {
    it('should call getCartaoByID in the service and return response from service', async () => {
      const id = 1;
      const response =CartaoReturn ;
      
      jest.spyOn(service, 'getCartaoByID').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getCartaoByID(res, id);

      expect(service.getCartaoByID).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });



  
});