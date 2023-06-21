import { Test, TestingModule } from '@nestjs/testing';
import { CiclistaController } from './ciclista.controller';
import { CiclistaService } from './ciclista.service';
import { novoCiclista } from '../../dto/novoCiclista.dto';
import { CadastroCiclista } from '../../dto/cadastroCiclista.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { nacionalidade } from '../../enums/nacionalidade.enum';
import { statusCiclista } from '../../enums/statusCiclista.enum';
import { CartaoModule } from '../cartao/cartao.module';
import { CiclistaRepository } from './ciclista.repository';
import { Utils } from '../../common/utils';
import { AluguelRepository } from '../aluguel/aluguel.repository';

const newCiclista=  {
    nome: 'John Doe',
    nascimento: '1990-01-01',
    cpf: '1234567890',
    passaporte: {
      numero: 'ABCD1234',
      validade: '2025-12-31',
      pais: 'Brasil',
    },
    nacionalidade: nacionalidade.BRASILEIRO,
    email: 'john.doe@example.com',
    urlFotoDocumento: 'https://example.com/document.jpg',
    senha: 'password123',
  }
  const CiclistaReturn=  {  
    id: 1,
    nome: 'Jane Smith',
    nascimento: '1992-05-15',
    cpf: '9876543210',
    passaporte: {
      numero: 'WXYZ5678',
      validade: '2024-10-31',
      pais: 'Estados Unidos',
    },
    nacionalidade: nacionalidade.ESTRANGEIRO,
    email: 'jane.smith@example.com',
    urlFotoDocumento: 'https://example.com/document2.jpg',
    senha: 'secret789',
    status: statusCiclista.INATIVO,
  }
  const BicicletaReturn= {
    "marca": "Marca 1",
    "modelo": "Modelo 1",
    "ano": "2023",
    "numero": "123456",
    "status": "Disponível",
    "id": 1
  }
  const newCartao= {
    nomeTitular: 'John Doe',
    numero: '1234567890123456',
    validade: '12/2025',
    cvv: '123',
  }
  const ciclista: CadastroCiclista = {
    Ciclista: newCiclista,
    MetodoDePagamento:  newCartao,
  };
describe('CiclistaController', () => {
  let controller: CiclistaController;
  let service: CiclistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CartaoModule],
      controllers: [CiclistaController],
      providers: [CiclistaService, CiclistaRepository, Utils,AluguelRepository],
      exports: [CiclistaService, Utils],
    }).compile();


    controller = module.get<CiclistaController>(CiclistaController);
    service = module.get<CiclistaService>(CiclistaService);
  });

  describe('cadastrarCiclista', () => {
    it('should call insertCiclista in the service and return response from service', async () => {
      const cadastroCiclista: CadastroCiclista = ciclista;
      const response = CiclistaReturn; // sample response from the service
      
      jest.spyOn(service, 'insertCiclista').mockResolvedValue(CiclistaReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.cadastrarCiclista(cadastroCiclista, res);

      expect(service.insertCiclista).toHaveBeenCalledWith(cadastroCiclista);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('getCiclista', () => {
    it('should call getCiclistas in the service and return response from service', async () => {
      const response = [CiclistaReturn];
      
      jest.spyOn(service, 'getCiclistas').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getCiclista(res);

      expect(service.getCiclistas).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('updateCiclista', () => {
    it('should call updateCiclista in the service and return response from service', async () => {
      const id = '1';
      const novoCiclista: novoCiclista = newCiclista;
      const response = CiclistaReturn 
      
      jest.spyOn(service, 'updateCiclista').mockResolvedValue(CiclistaReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.updateCiclista(novoCiclista, res, id);

      expect(service.updateCiclista).toHaveBeenCalledWith(parseInt(id), novoCiclista);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('deleteCiclista', () => {
    it('should call deleteCiclista in the service and return response from service', async () => {
      const id = '1';
      const response = true; 
      
      jest.spyOn(service, 'deleteCiclista').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.deleteCiclista(res, id);

      expect(service.deleteCiclista).toHaveBeenCalledWith(parseInt(id));
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('getCiclistaByID', () => {
    it('should call getCiclistaByID in the service and return response from service', async () => {
      const id = '1';
      const response =CiclistaReturn ;
      
      jest.spyOn(service, 'getCiclistaByID').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getCiclistaByID(res, id);

      expect(service.getCiclistaByID).toHaveBeenCalledWith(parseInt(id));
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('ativarCiclista', () => {
    it('should call ativarCiclista in the service and return response from service', async () => {
      const id = '1';
      const response = true; 
      
      jest.spyOn(service, 'ativarCiclista').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.ativarCiclista(res, id);

      expect(service.ativarCiclista).toHaveBeenCalledWith(parseInt(id));
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('checkEmail', () => {
    it('should call checkEmail in the service and return response from service', async () => {
      const email = 'test@example.com';
      const response = true;
      
      jest.spyOn(service, 'checkEmail').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.checkEmail(res, email);

      expect(service.checkEmail).toHaveBeenCalledWith(email);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('permiteAluguel', () => {
    it('should call permiteAluguel in the service and return response from service', async () => {
      const id = '1';
      const response =true ;
      
      jest.spyOn(service, 'permiteAluguel').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.permiteAluguel(res, id);

      expect(service.permiteAluguel).toHaveBeenCalledWith(parseInt(id));
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('getBikeByCiclista', () => {
    it('should call getBikeByCiclista in the service and return response from service', async () => {
      const id = '1';
      const response =BicicletaReturn ;
      
      jest.spyOn(service, 'getBikeByCiclista').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getBikeByCiclista(res, id);

      expect(service.getBikeByCiclista).toHaveBeenCalledWith(parseInt(id));
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });
});