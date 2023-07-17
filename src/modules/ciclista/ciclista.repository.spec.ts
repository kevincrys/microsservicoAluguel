import { CiclistaRepository } from './ciclista.repository';
import { statusCiclista } from "../../enums/statusCiclista.enum";
import { Ciclista } from "../../schemas/ciclista.schema";
import { novoCiclista } from "../../dto/novoCiclista.dto";
import { Brackets, DeleteQueryBuilder, EntityMetadata, EntityTarget, FindManyOptions, FindOptionsOrder, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, InsertQueryBuilder, NotBrackets, ObjectLiteral, OrderByCondition, QueryBuilder, QueryRunner, RelationQueryBuilder, SelectQueryBuilder, UpdateQueryBuilder } from 'typeorm';
import { nacionalidade } from '../../enums/nacionalidade.enum';
import { Repository } from 'typeorm';
import { ReadStream } from 'fs';
import { ReturningType } from 'typeorm/driver/Driver';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { Alias } from 'typeorm/query-builder/Alias';
import { QueryBuilderCteOptions } from 'typeorm/query-builder/QueryBuilderCte';
import { QueryExpressionMap } from 'typeorm/query-builder/QueryExpressionMap';
import { SelectQuery } from 'typeorm/query-builder/SelectQuery';
import { SelectQueryBuilderOption } from 'typeorm/query-builder/SelectQueryBuilderOption';
import { SoftDeleteQueryBuilder } from 'typeorm/query-builder/SoftDeleteQueryBuilder';
import { WhereClause, WhereClauseCondition } from 'typeorm/query-builder/WhereClause';
const ciclistasArray: Ciclista[] = [
  {  id: 1,
    nome: 'Jane Smith',
    nascimento: '1992-05-15',
    cpf: '9876543210',
    passaporte: {
      id: 1,
      numero: 'WXYZ5678',
      validade: '2024-10-31',
      pais: 'Estados Unidos',
    },
    nacionalidade: nacionalidade.ESTRANGEIRO,
    email: 'jane.smith@example.com',
    urlFotoDocumento: 'https://example.com/document2.jpg',
    senha: 'secret789',
    status: statusCiclista.INATIVO,
  },{
    id:2,
    nome: 'Carlos Ramirez',
    nascimento: '1985-09-20',
    cpf: '4567890123',
    passaporte: {
      id: 1,
      numero: 'LMNO9012',
      validade: '2023-06-30',
      pais: 'México',
    },
    nacionalidade: nacionalidade.ESTRANGEIRO,
    email: 'carlos.ramirez@example.com',
    urlFotoDocumento: 'https://example.com/document3.jpg',
    senha: 'confidential456',
    status: statusCiclista.ATIVO,
  },

];
describe("CiclistaRepository", () => {
  let ciclistaRepository: CiclistaRepository;
  let repositoryMock: Partial<Repository<Ciclista>>;

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

    ciclistaRepository = new CiclistaRepository(repositoryMock as Repository<Ciclista>);
  });

  it("should insert a new ciclista", async () => {
    const ciclistaData: novoCiclista =  {
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
        
      };
      const ciclistaDataReturn: Ciclista =  {
        nome: 'John Doe',
        nascimento: '1990-01-01',
        cpf: '1234567890',
        passaporte: {
          id:1,
          numero: 'ABCD1234',
          validade: '2025-12-31',
          pais: 'Brasil',
        },
        nacionalidade: nacionalidade.BRASILEIRO,
        email: 'john.doe@example.com',
        urlFotoDocumento: 'https://example.com/document.jpg',
        senha: 'password123',
        status: statusCiclista.AGUARDANDO
      };
      jest
      .spyOn(repositoryMock, 'save')
      .mockResolvedValue(ciclistaDataReturn)
    const result = await ciclistaRepository.insertCiclista(ciclistaData);

    expect(result).toEqual(
      expect.objectContaining({
        nome: ciclistaData.nome,
        nascimento: ciclistaData.nascimento,
        cpf: ciclistaData.cpf,
        passaporte: ciclistaDataReturn.passaporte,
        nacionalidade: ciclistaData.nacionalidade,
        email: ciclistaData.email,
        urlFotoDocumento: ciclistaData.urlFotoDocumento,
        senha: ciclistaData.senha,
        status: statusCiclista.AGUARDANDO,
      })
    );
  });

  it("should update an existing ciclista", async () => {
    
    const ciclistaId = 1; 
   
    const updatedCiclistaData: novoCiclista =  {
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
      };

      const updatedCiclistaDataReturn: Ciclista =  {
        id: ciclistaId,
        nome: 'John Doe',
        nascimento: '1990-01-01',
        cpf: '1234567890',
        passaporte: {
          id:1,
          numero: 'ABCD1234',
          validade: '2025-12-31',
          pais: 'Brasil',
        },
        nacionalidade: nacionalidade.BRASILEIRO,
        email: 'john.doe@example.com',
        urlFotoDocumento: 'https://example.com/document.jpg',
        senha: 'password123',
        status:statusCiclista.AGUARDANDO
      };
      jest
      .spyOn(repositoryMock, 'update')
      jest
      .spyOn(repositoryMock, 'findOneBy')
      .mockResolvedValue(updatedCiclistaDataReturn)
    const result = await ciclistaRepository.updateCiclista(ciclistaId, updatedCiclistaData);


   
   
    expect(result).toEqual(
      expect.objectContaining({
        id: ciclistaId,
        nome: updatedCiclistaData.nome,
        nascimento: updatedCiclistaData.nascimento,
        cpf: updatedCiclistaData.cpf,
        passaporte: updatedCiclistaDataReturn.passaporte,
        nacionalidade: updatedCiclistaData.nacionalidade,
        email: updatedCiclistaData.email,
        urlFotoDocumento: updatedCiclistaData.urlFotoDocumento,
        senha: updatedCiclistaData.senha,
        status: statusCiclista.AGUARDANDO,
      })
    );
  });

  it("should delete an existing ciclista", async () => {
    const ciclistaId = 2;
    jest.spyOn(repositoryMock, 'createQueryBuilder')
  .mockReturnValue({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue(ciclistasArray[0]),
  } as any)

    const result = await ciclistaRepository.deleteCiclista(ciclistaId);
    expect(result).toBe(true);
    // Verifique se o ciclista foi removido corretamente da lista ciclistasNovos
  });
  ;

  it("should get a ciclista by ID", async () => {
    const ciclistaId = 1;
  // mock da função .createQueryBuilder
   jest.spyOn(repositoryMock, 'createQueryBuilder')
  .mockReturnValue({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn().mockResolvedValue(ciclistasArray[0]),
  } as any)

    const result = await ciclistaRepository.getCiclistaByID(ciclistaId);
    // Verifique se o ciclista retornado possui o ID correto
    expect(result.id).toBe(ciclistaId);
  });

  it("should check if an email is available", async () => {
    const email = "john.doe@example.com"; // Email a ser verificado
    jest
    .spyOn(repositoryMock, 'findOneBy')
    .mockResolvedValue(null)
    const result = await ciclistaRepository.checkEmail(email);

    expect(result).toBeTruthy();
    
  });

  it("should activate a ciclista", async () => {
    const ciclistaId = 1; // ID de um ciclista existente
    jest
    .spyOn(ciclistaRepository, 'getCiclistaByID')
    .mockResolvedValue(ciclistasArray[0])
    jest
    .spyOn(ciclistaRepository, 'updateCiclista')
    .mockResolvedValue(ciclistasArray[0])
    const result = await ciclistaRepository.ativarCiclista(ciclistaId);

    expect(result).toBeTruthy();

  });

  it("should dont  activate a ciclista bacause dont getCiclistaByID", async () => {
    const ciclistaId = 1; // ID de um ciclista existente
    jest
    .spyOn(ciclistaRepository, 'getCiclistaByID')
    .mockResolvedValue(null)
    jest
    .spyOn(ciclistaRepository, 'updateCiclista')
    .mockResolvedValue(ciclistasArray[0])
    const result = await ciclistaRepository.ativarCiclista(ciclistaId);

    expect(result).toBeFalsy();

  });

  it("should dont  activate a ciclista bacause dont updateCiclista", async () => {
    const ciclistaId = 1; // ID de um ciclista existente
    jest
    .spyOn(ciclistaRepository, 'getCiclistaByID')
    .mockResolvedValue(ciclistasArray[0])
    jest
    .spyOn(ciclistaRepository, 'updateCiclista')
    .mockResolvedValue(null)
    const result = await ciclistaRepository.ativarCiclista(ciclistaId);

    expect(result).toBeFalsy();

  });
});