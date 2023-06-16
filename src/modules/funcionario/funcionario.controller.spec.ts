import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('FuncionarioController', () => {
  let controller: FuncionarioController;
  let service: FuncionarioService;
  let res: Response;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
  });

  describe('cadastrarFuncionario', () => {
    it('should insert Funcionario and return true', async () => {
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      const insertFuncionarioSpy = jest
        .spyOn(service, 'insertFuncionario')
        .mockResolvedValue(true);

      await controller.cadastrarFuncionario(novoFuncionario, res);

      expect(insertFuncionarioSpy).toHaveBeenCalledWith(novoFuncionario);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(true);
    });
  });

  describe('getFuncionario', () => {
    it('should get all Funcionarios', async () => {
      const funcionarios = [
        {
          senha: 'password1',
          confirmacaoSenha: 'password1',
          email: 'john@example.com',
          nome: 'John Doe',
          idade: 30,
          funcao: 'Gerente',
          cpf: '1234567890',
          matricula: '1234',
        },
        {
          senha: 'password2',
          confirmacaoSenha: 'password2',
          email: 'jane@example.com',
          nome: 'Jane Smith',
          idade: 25,
          funcao: 'Analista',
          cpf: '0987654321',
          matricula: '5678',
        },
      ];

      const getFuncionariosSpy = jest
        .spyOn(service, 'getFuncionarios')
        .mockResolvedValue(funcionarios);

      await controller.getFuncionario(res);

      expect(getFuncionariosSpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(funcionarios);
    });
  });

  describe('updateFuncionario', () => {
    it('should update Funcionario and return true', async () => {
      const id = '1234';
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      const updateFuncionarioSpy = jest
        .spyOn(service, 'updateFuncionario')
        .mockResolvedValue(true);

      await controller.updateFuncionario(novoFuncionario, res, id);

      expect(updateFuncionarioSpy).toHaveBeenCalledWith(id, novoFuncionario);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(true);
    });
  });

  describe('deleteFuncionario', () => {
    it('should delete Funcionario and return true', async () => {
      const id = '1234';

      const deleteFuncionarioSpy = jest
        .spyOn(service, 'deleteFuncionario')
        .mockResolvedValue(true);

      await controller.deleteFuncionario(res, id);

      expect(deleteFuncionarioSpy).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(true);
    });
  });

  describe('getFuncionarioByID', () => {
    it('should get Funcionario by ID', async () => {
      const id = '1234';
      const funcionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
        matricula: '5678',
      };

      const getFuncionarioByIDSpy = jest
        .spyOn(service, 'getFuncionarioByID')
        .mockResolvedValue(funcionario);

      await controller.getFuncionarioByID(res, id);

      expect(getFuncionarioByIDSpy).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(funcionario);
    });
  });
});