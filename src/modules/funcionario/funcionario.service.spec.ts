import { FuncionarioService } from './funcionario.service';
import { NotFoundException } from '@nestjs/common';

describe('FuncionarioService', () => {
  let service: FuncionarioService;
  let funcionarioRepository: any;
  let utils: any;

  beforeEach(() => {
    funcionarioRepository = {
      insertFuncionario: jest.fn(),
      updateFuncionario: jest.fn(),
      deleteFuncionario: jest.fn(),
      getFuncionarioByID: jest.fn(),
      getFuncionarios: jest.fn(),
    };

    utils = {
      checkNullOrBlank: jest.fn(),
    };

    service = new FuncionarioService(funcionarioRepository, utils);
  });

  describe('insertFuncionario', () => {
    it('should insert Funcionario', async () => {
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      await service.insertFuncionario(novoFuncionario);

      expect(funcionarioRepository.insertFuncionario).toHaveBeenCalledWith(novoFuncionario);
    });
  });

  describe('updateFuncionario', () => {
    it('should update Funcionario', async () => {
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

      utils.checkNullOrBlank.mockReturnValue(false);
      funcionarioRepository.updateFuncionario.mockReturnValue({});

      await service.updateFuncionario(id, novoFuncionario);

      expect(funcionarioRepository.updateFuncionario).toHaveBeenCalledWith(id, novoFuncionario);
    });

    it('should throw NotFoundException when Funcionario is not found', async () => {
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

      utils.checkNullOrBlank.mockReturnValue(false);
      funcionarioRepository.updateFuncionario.mockReturnValue(undefined);

      await expect(service.updateFuncionario(id, novoFuncionario)).rejects.toThrow(NotFoundException);
    });

    it('should not update Funcionario when novoFuncionario is null or blank', async () => {
      const id = '1234';
      const novoFuncionario = null;

      utils.checkNullOrBlank.mockReturnValue(true);

      await service.updateFuncionario(id, novoFuncionario);

      expect(funcionarioRepository.updateFuncionario).not.toHaveBeenCalled();
    });
  });

  describe('deleteFuncionario', () => {
    it('should delete Funcionario', async () => {
      const id = '1234';

      utils.checkNullOrBlank.mockReturnValue(false);
      funcionarioRepository.deleteFuncionario.mockReturnValue(true);

      await service.deleteFuncionario(id);

      expect(funcionarioRepository.deleteFuncionario).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when Funcionario is not found', async () => {
      const id = '1234';

      utils.checkNullOrBlank.mockReturnValue(false);
      funcionarioRepository.deleteFuncionario.mockReturnValue(false);

      await expect(service.deleteFuncionario(id)).rejects.toThrow(NotFoundException);
    });

    it('should not delete Funcionario when id is null or blank', async () => {
      const id = null;

      utils.checkNullOrBlank.mockReturnValue(true);

      await service.deleteFuncionario(id);

      expect(funcionarioRepository.deleteFuncionario).not.toHaveBeenCalled();
    });
  });

  describe('getFuncionarioByID', () => {
    it('should return Funcionario by id', async () => {
      const id = '1234';
      const funcionario = {
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
      funcionarioRepository.getFuncionarioByID.mockReturnValue(funcionario);

      const result = await service.getFuncionarioByID(id);

      expect(result).toEqual(funcionario);
      expect(funcionarioRepository.getFuncionarioByID).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException when Funcionario is not found', async () => {
      const id = '1234';

      utils.checkNullOrBlank.mockReturnValue(true);
      funcionarioRepository.getFuncionarioByID.mockReturnValue(undefined);

      await expect(service.getFuncionarioByID(id)).rejects.toThrow(NotFoundException);
    });

    it('should not getFuncionarioByID when id is null or blank', async () => {
      const id = null;

      utils.checkNullOrBlank.mockReturnValue(true);

     

      await expect(service.getFuncionarioByID(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getFuncionarios', () => {
    it('should return all Funcionarios', async () => {
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

      utils.checkNullOrBlank.mockReturnValue(false);
      funcionarioRepository.getFuncionarios.mockReturnValue(funcionarios);

      const result = await service.getFuncionarios();

      expect(result).toEqual(funcionarios);
      expect(funcionarioRepository.getFuncionarios).toHaveBeenCalled();
    });
  });
});