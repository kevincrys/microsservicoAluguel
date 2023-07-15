import { CiclistaRepository } from './ciclista.repository';
import { statusCiclista } from "../../enums/statusCiclista.enum";
import { Ciclista } from "../../schemas/ciclista.schema";
import { novoCiclista } from "../../dto/novoCiclista.dto";

import { nacionalidade } from '../../enums/nacionalidade.enum';
import { Repository } from 'typeorm';
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

    const result = await ciclistaRepository.insertCiclista(ciclistaData);

    expect(result).toEqual(
      expect.objectContaining({
        nome: ciclistaData.nome,
        nascimento: ciclistaData.nascimento,
        cpf: ciclistaData.cpf,
        passaporte: ciclistaData.passaporte,
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
        passaporte: updatedCiclistaData.passaporte,
        nacionalidade: updatedCiclistaData.nacionalidade,
        email: updatedCiclistaData.email,
        urlFotoDocumento: updatedCiclistaData.urlFotoDocumento,
        senha: updatedCiclistaData.senha,
        status: expect.any(String),
      })
    );
  });

  it("should delete an existing ciclista", async () => {
    const ciclistaId = 2;
    jest
    .spyOn(ciclistaRepository, 'getCiclistas')
    .mockResolvedValue(ciclistasArray)
    const result = await ciclistaRepository.deleteCiclista(ciclistaId);
    expect(result).toBe(true);
    // Verifique se o ciclista foi removido corretamente da lista ciclistasNovos
  });
  ;

  it("should get a ciclista by ID", async () => {
    const ciclistaId = 1;
    jest
    .spyOn(ciclistaRepository, 'getCiclistas')
    .mockResolvedValue(ciclistasArray)
    const result = await ciclistaRepository.getCiclistaByID(ciclistaId);
    // Verifique se o ciclista retornado possui o ID correto
    expect(result.id).toBe(ciclistaId);
  });

  it("should check if an email is available", async () => {
    const email = "john.doe@example.com"; // Email a ser verificado
    jest
    .spyOn(ciclistaRepository, 'getCiclistas')
    .mockResolvedValue(ciclistasArray)
    const result = await ciclistaRepository.checkEmail(email);

    expect(result).toBeTruthy();
    
  });

  it("should activate a ciclista", async () => {
    const ciclistaId = 1; // ID de um ciclista existente
    jest
    .spyOn(ciclistaRepository, 'getCiclistas')
    .mockResolvedValue(ciclistasArray)
    const result = await ciclistaRepository.ativarCiclista(ciclistaId);

    expect(result).toBeTruthy();

  });
});