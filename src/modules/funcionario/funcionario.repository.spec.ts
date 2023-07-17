import { Funcionario } from '../../schemas/funcionario.schema';
import { FuncionarioRepository } from './funcionario.repository';
import { Repository } from 'typeorm';
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
  let funcionarioRepository: FuncionarioRepository;
  let repositoryMock: Partial<Repository<Funcionario>>;

  beforeEach(() => {
    repositoryMock = {
      save: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder:jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
    };

    funcionarioRepository = new FuncionarioRepository(repositoryMock as Repository<Funcionario>);
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
      jest
      .spyOn(repositoryMock, 'save')
      .mockResolvedValue({ ...novoFuncionario, matricula: "mocked-uuid" })
     
     const func= await funcionarioRepository.insertFuncionario(novoFuncionario);
     
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
      .spyOn(repositoryMock, 'update')
      jest
      .spyOn(repositoryMock, 'save')
      .mockResolvedValue(novoFuncionario)
      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockResolvedValue({ ...novoFuncionario, matricula })

      const updated = await funcionarioRepository.updateFuncionario(matricula, novoFuncionario);

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
      jest
      .spyOn(repositoryMock, 'update')
      jest
      .spyOn(repositoryMock, 'save')
      .mockResolvedValue(novoFuncionario)
      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockResolvedValue(undefined)
      const updated = await funcionarioRepository.updateFuncionario(matricula, novoFuncionario);

      expect(updated).toBeUndefined();
    });
  });

  describe('deleteFuncionario', () => {
    it('should delete Funcionario by matricula', async () => {
      const matricula = 'MAT002';
   
      jest
      .spyOn(repositoryMock, 'delete')
      jest
      .spyOn(funcionarioRepository, 'getFuncionarioByID')
      .mockResolvedValue(null)


      const deleted = await funcionarioRepository.deleteFuncionario(matricula);

      expect(deleted).toBe(true);
     
    });
  });

 

  describe('getFuncionarioByID', () => {
    it('should return Funcionario by matricula', async () => {
      const matricula = 'MAT001';
   

      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockResolvedValue(funcionarios[0])

      const funcionario = await funcionarioRepository.getFuncionarioByID(matricula);

      expect(funcionario).toEqual({ ...funcionarios[0], matricula });
    });

    it('should return undefined for non-existent Funcionario', async () => {
      const matricula = '1234';
      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockResolvedValue(undefined)
      const funcionario = await funcionarioRepository.getFuncionarioByID(matricula);

      expect(funcionario).toBeUndefined();
    });
  });
});