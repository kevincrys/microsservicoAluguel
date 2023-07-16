import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { novoFuncionario } from '../../dto/novoFuncionario.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { FuncionarioRepository } from './funcionario.repository';
import { Utils } from '../../common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from '../../schemas/funcionario.schema';
import { mockDatabaseConfig } from '../../mockdatabase.config';
const newFuncionario=   {
  senha: 'password',
  confirmacaoSenha: 'password',
  email: 'john@example.com',
  nome: 'John Doe',
  idade: 30,
  funcao: 'Gerente',
  cpf: '1234567890',
}
  const FuncionarioReturn=   {
    senha: 'senha1',
    confirmacaoSenha: 'senha1',
    email: 'funcionario1@example.com',
    nome: 'Funcionário 1',
    idade: 25,
    funcao: 'Cargo 1',
    cpf: '12345678901',
    matricula: 'MAT001',
  }

describe('FuncionarioController', () => {
  let controller: FuncionarioController;
  let service: FuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Funcionario]),TypeOrmModule.forRoot(mockDatabaseConfig)],
      controllers: [FuncionarioController],
      providers: [FuncionarioService, FuncionarioRepository, Utils],
      exports: [FuncionarioService, Utils],
    }).compile();


    controller = module.get<FuncionarioController>(FuncionarioController);
    service = module.get<FuncionarioService>(FuncionarioService);
  });

  describe('cadastrarFuncionario', () => {
    it('should call insertFuncionario in the service and return response from service', async () => {

      const response = FuncionarioReturn; // sample response from the service
      
      jest.spyOn(service, 'insertFuncionario').mockResolvedValue(FuncionarioReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.cadastrarFuncionario(newFuncionario, res);

      expect(service.insertFuncionario).toHaveBeenCalledWith(newFuncionario);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('getFuncionario', () => {
    it('should call getFuncionarios in the service and return response from service', async () => {
      const response = [FuncionarioReturn];
      
      jest.spyOn(service, 'getFuncionarios').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getFuncionario(res);

      expect(service.getFuncionarios).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('updateFuncionario', () => {
    it('should call updateFuncionario in the service and return response from service', async () => {
      const id = 'MAT001';
      const novoFuncionario: novoFuncionario = newFuncionario;
      const response = FuncionarioReturn 
      
      jest.spyOn(service, 'updateFuncionario').mockResolvedValue(FuncionarioReturn);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.updateFuncionario(novoFuncionario, res, id);

      expect(service.updateFuncionario).toHaveBeenCalledWith(id, novoFuncionario);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('deleteFuncionario', () => {
    it('should call deleteFuncionario in the service and return response from service', async () => {
      const id = 'MAT001';
      const response = true; 
      
      jest.spyOn(service, 'deleteFuncionario').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.deleteFuncionario(res, id);

      expect(service.deleteFuncionario).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });

  describe('getFuncionarioByID', () => {
    it('should call getFuncionarioByID in the service and return response from service', async () => {
      const id = 'MAT001';
      const response =FuncionarioReturn ;
      
      jest.spyOn(service, 'getFuncionarioByID').mockResolvedValue(response);
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getFuncionarioByID(res, id);

      expect(service.getFuncionarioByID).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(response);
    });
  });



  
});