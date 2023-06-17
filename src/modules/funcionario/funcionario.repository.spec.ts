import { Funcionario } from 'src/schemas/funcionario.schema';
import { FuncionarioRepository } from './funcionario.repository';
jest.mock('uuid', () => ({
  __esModule: true,
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));
const funcionarios: Funcionario[] = [
  {
    senha: 'senha1',
    confirmacaoSenha: 'senha1',
    email: 'funcionario1@example.com',
    nome: 'Funcionário 1',
    idade: 25,
    funcao: 'Cargo 1',
    cpf: '12345678901',
    matricula: 'MAT001',
  },
  {
    senha: 'senha2',
    confirmacaoSenha: 'senha2',
    email: 'funcionario2@example.com',
    nome: 'Funcionário 2',
    idade: 30,
    funcao: 'Cargo 2',
    cpf: '23456789012',
    matricula: 'MAT002',
  },
  {
    senha: 'senha3',
    confirmacaoSenha: 'senha3',
    email: 'funcionario3@example.com',
    nome: 'Funcionário 3',
    idade: 35,
    funcao: 'Cargo 3',
    cpf: '34567890123',
    matricula: 'MAT003',
  },
  {
    senha: 'senha4',
    confirmacaoSenha: 'senha4',
    email: 'funcionario4@example.com',
    nome: 'Funcionário 4',
    idade: 40,
    funcao: 'Cargo 4',
    cpf: '45678901234',
    matricula: 'MAT004',
  },
];
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
     
      expect(func).toEqual({ ...novoFuncionario, matricula: "mocked-uuid" });
    });
  });

  describe('updateFuncionario', () => {
    it('should update Funcionario by matricula', async () => {
      const matricula = "MAT001";
      const novoFuncionario = {
        senha: 'password',
        confirmacaoSenha: 'password',
        email: 'john@example.com',
        nome: 'John Doe',
        idade: 30,
        funcao: 'Gerente',
        cpf: '1234567890',
      };
      jest
      .spyOn(repository, 'getFuncionarios')
      .mockResolvedValue(funcionarios)
      const updated = await repository.updateFuncionario(matricula, novoFuncionario);

      expect(updated).toStrictEqual({ ...novoFuncionario, matricula });

    });

    it('should return false when trying to update non-existent Funcionario', async () => {
      const matricula = 'MAT002';
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
      const matricula = 'MAT002';
   
      jest
      .spyOn(repository, 'getFuncionarios')
      .mockResolvedValue(funcionarios)

      const deleted = await repository.deleteFuncionario(matricula);

      expect(deleted).toBe(true);
     
    });

    it('should return false when trying to delete non-existent Funcionario', async () => {
      const matricula = 'MAT21';
      jest
      .spyOn(repository, 'getFuncionarios')
      .mockResolvedValue(funcionarios)
      const deleted = await repository.deleteFuncionario(matricula);

      expect(deleted).toBe(false);
    });
  });

 

  describe('getFuncionarioByID', () => {
    it('should return Funcionario by matricula', async () => {
      const matricula = 'MAT002';
   

      jest
      .spyOn(repository, 'getFuncionarios')
      .mockResolvedValue(funcionarios)

      const funcionario = await repository.getFuncionarioByID(matricula);

      expect(funcionario).toEqual({ ...funcionarios[1], matricula });
    });

    it('should return undefined for non-existent Funcionario', async () => {
      const matricula = '1234';
      jest
      .spyOn(repository, 'getFuncionarios')
      .mockResolvedValue(funcionarios)
      const funcionario = await repository.getFuncionarioByID(matricula);

      expect(funcionario).toBeUndefined();
    });
  });
});