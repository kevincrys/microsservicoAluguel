import { FuncionarioRepository } from './funcionario.repository';

describe('FuncionarioRepository', () => {
  let repository: FuncionarioRepository;

  beforeEach(() => {
    repository = new FuncionarioRepository();
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

     const func= await repository.insertFuncionario(novoFuncionario);

      expect(func).toEqual([{ ...novoFuncionario, matricula: expect.any(String) }]);
    });
  });

  describe('updateFuncionario', () => {
    it('should update Funcionario by matricula', async () => {
      const matricula = '1234';
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      repository.insertFuncionario(novoFuncionario);

      const updated = await repository.updateFuncionario(matricula, novoFuncionario);

      expect(updated).toBe({ ...novoFuncionario, matricula });

    });

    it('should return false when trying to update non-existent Funcionario', async () => {
      const matricula = '1234';
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      const updated = await repository.updateFuncionario(matricula, novoFuncionario);

      expect(updated).toBeUndefined();
    });
  });

  describe('deleteFuncionario', () => {
    it('should delete Funcionario by matricula', async () => {
      const matricula = '1234';
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      repository.insertFuncionario(novoFuncionario);

      const deleted = await repository.deleteFuncionario(matricula);

      expect(deleted).toBe(true);
      expect(repository.getFuncionarioByID(matricula)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent Funcionario', async () => {
      const matricula = '1234';

      const deleted = await repository.deleteFuncionario(matricula);

      expect(deleted).toBe(false);
    });
  });

  describe('getFuncionarios', () => {
    it('should return all Funcionarios', async () => {
      const novoFuncionario1 = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };
      const novoFuncionario2 = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'jane@example.com',
        nome: 'Jane Smith',
        idade: 25,
        funcao: 'Analista',
        cpf: '0987654321',
      };

      repository.insertFuncionario(novoFuncionario1);
      repository.insertFuncionario(novoFuncionario2);

      const funcionarios = await repository.getFuncionarios();

      expect(funcionarios).toEqual([
        { ...novoFuncionario1, matricula: expect.any(String) },
        { ...novoFuncionario2, matricula: expect.any(String) },
      ]);
    });
  });

  describe('getFuncionarioByID', () => {
    it('should return Funcionario by matricula', async () => {
      const matricula = '1234';
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };

      repository.insertFuncionario(novoFuncionario);

      const funcionario = await repository.getFuncionarioByID(matricula);

      expect(funcionario).toEqual({ ...novoFuncionario, matricula });
    });

    it('should return undefined for non-existent Funcionario', async () => {
      const matricula = '1234';

      const funcionario = await repository.getFuncionarioByID(matricula);

      expect(funcionario).toBeUndefined();
    });
  });
});