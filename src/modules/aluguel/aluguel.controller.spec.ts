import { Test, TestingModule } from '@nestjs/testing';
import { AluguelController } from './aluguel.controller';
import { AluguelService } from './aluguel.service';


import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

import { AluguelRepository } from './aluguel.repository';

import { CiclistaModule } from '../ciclista/ciclista.module';

const newAluguel=  {
  "ciclista": 1,
  "trancaInicio": 1234,
}
  const AluguelReturn=  {
    "ciclista": 1,
    "trancaInicio": 1234,
    "bicicleta": 9876,
    "horaInicio": "2023-06-18T10:00:00",
    "trancaFim": 5678,
    "horaFim": "2023-06-18T11:30:00",
    "cobranca": 20.5
  }

describe('AluguelController', () => {
  let controller: AluguelController;
  let service: AluguelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CiclistaModule],
      controllers:[AluguelController],
      providers: [AluguelService, AluguelRepository],
      exports: [AluguelService],
    }).compile();


    controller = module.get<AluguelController>(AluguelController);
    service = module.get<AluguelService>(AluguelService);
  });

  describe('cadastrarAluguel', () => {
    it('should call insertAluguel in the service and return response from service', async () => {
      const cadastroAluguel= newAluguel
      const response = AluguelReturn; // sample response from the service
      
      jest.spyOn(service, 'insertAluguel').mockResolvedValue(AluguelReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.cadastrarAluguel(cadastroAluguel, res);

      expect(service.insertAluguel).toHaveBeenCalledWith(cadastroAluguel);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });


  // describe('permiteAluguel', () => {
  //   it('should call permiteAluguel in the service and return response from service', async () => {
  //     const id = '1';
  //     const response =true ;
      
  //     jest.spyOn(service, 'permiteAluguel').mockResolvedValue(response);
  //     const res: Response = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //     } as any;

  //     await controller.getAluguelByID(res, id);

  //     expect(service.getAluguelByID).toHaveBeenCalledWith(parseInt(id));
  //     expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
  //     expect(res.send).toHaveBeenCalledWith(response);
  //   });
  // });

  // describe('getBikeByAluguel', () => {
  //   it('should call getBikeByAluguel in the service and return response from service', async () => {
  //     const id = '1';
  //     const response =BicicletaReturn ;
      
  //     jest.spyOn(service, 'getBikeByAluguel').mockResolvedValue(response);
  //     const res: Response = {
  //       status: jest.fn().mockReturnThis(),
  //       send: jest.fn(),
  //     } as any;

  //     await controller.getBikeByAluguel(res, id);

  //     expect(service.getBikeByAluguel).toHaveBeenCalledWith(parseInt(id));
  //     expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
  //     expect(res.send).toHaveBeenCalledWith(response);
  //   });
  // });
});