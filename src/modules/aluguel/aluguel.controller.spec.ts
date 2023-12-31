import { Test, TestingModule } from '@nestjs/testing';
import { AluguelController } from './aluguel.controller';
import { AluguelService } from './aluguel.service';
import { mockDatabaseConfig } from '../../mockdatabase.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluguel } from '../../schemas/aluguel.schema';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

import { AluguelRepository } from './aluguel.repository';

import { CiclistaModule } from '../ciclista/ciclista.module';
import { Api } from '../../common/api';

const newAluguel=  {
  "ciclista": 1,
  "trancaInicio": 1234,
}
  const AluguelReturn=  {
    "id":1,
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
      imports: [CiclistaModule,TypeOrmModule.forFeature([Aluguel]),TypeOrmModule.forRoot(mockDatabaseConfig)],
      controllers:[AluguelController],
      providers: [AluguelService, AluguelRepository,Api],
      exports: [AluguelService,Api],
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


  
});