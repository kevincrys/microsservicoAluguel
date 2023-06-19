import { Test, TestingModule } from '@nestjs/testing';
import { DevolucaoController } from './devolucao.controller';
import { DevolucaoService } from './devolucao.service';


import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

import { DevolucaoRepository } from './devolucao.repository';

import { CiclistaModule } from '../ciclista/ciclista.module';

const newDevolucao=  {
  "ciclista": 1,
  "trancaFim": 1234,
}
  const DevolucaoReturn=  {
    "ciclista": 1,
    "trancaInicio": 1234,
    "bicicleta": 9876,
    "horaInicio": "2023-06-18T10:00:00",
    "trancaFim": 5678,
    "horaFim": "2023-06-18T11:30:00",
    "cobranca": 20.5
  }

describe('DevolucaoController', () => {
  let controller: DevolucaoController;
  let service: DevolucaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CiclistaModule],
      controllers:[DevolucaoController],
      providers: [DevolucaoService, DevolucaoRepository],
      exports: [DevolucaoService],
    }).compile();


    controller = module.get<DevolucaoController>(DevolucaoController);
    service = module.get<DevolucaoService>(DevolucaoService);
  });

  describe('cadastrarDevolucao', () => {
    it('should call insertDevolucao in the service and return response from service', async () => {
      const cadastroDevolucao= newDevolucao
      const response = DevolucaoReturn; // sample response from the service
      
      jest.spyOn(service, 'insertDevolucao').mockResolvedValue(DevolucaoReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.cadastrarDevolucao(cadastroDevolucao, res);

      expect(service.insertDevolucao).toHaveBeenCalledWith(cadastroDevolucao);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });


  // describe('permiteDevolucao', () => {
  //   it('should call permiteDevolucao in the service and return response from service', async () => {
  //     const id = '1';
  //     const response =true ;
      
  //     jest.spyOn(service, 'permiteDevolucao').mockResolvedValue(response);
  //     const res: Response = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //     } as any;

  //     await controller.getDevolucaoByID(res, id);

  //     expect(service.getDevolucaoByID).toHaveBeenCalledWith(parseInt(id));
  //     expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
  //     expect(res.send).toHaveBeenCalledWith(response);
  //   });
  // });

  // describe('getBikeByDevolucao', () => {
  //   it('should call getBikeByDevolucao in the service and return response from service', async () => {
  //     const id = '1';
  //     const response =BicicletaReturn ;
      
  //     jest.spyOn(service, 'getBikeByDevolucao').mockResolvedValue(response);
  //     const res: Response = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //     } as any;

  //     await controller.getBikeByDevolucao(res, id);

  //     expect(service.getBikeByDevolucao).toHaveBeenCalledWith(parseInt(id));
  //     expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
  //     expect(res.send).toHaveBeenCalledWith(response);
  //   });
  // });
});