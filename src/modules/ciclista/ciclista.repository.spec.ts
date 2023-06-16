import { CiclistaRepository } from './ciclista.repository';
import { statusCiclista } from "src/enums/statusCiclista.enum";
import { Ciclista } from "src/schemas/Ciclista.schema";
import { novoCiclista } from "../../dto/novoCiclista.dto";

import { nacionalidade } from 'src/enums/nacionalidade.enum';
const ciclistaCad={  id: 1,
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
describe("CiclistaRepository", () => {
  let ciclistaRepository: CiclistaRepository;

  beforeEach(() => {
    ciclistaRepository = new CiclistaRepository();
  });

  afterEach(() => {
    ciclistaRepository = null;
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

    expect(result).toContainEqual(
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
    const ciclistaId = 123; // ID de um ciclista existente

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
    const ciclistaId = 123; // ID de um ciclista existente

    const result = await ciclistaRepository.deleteCiclista(ciclistaId);

    expect(result).toBeTruthy();
    // Verifique se o ciclista foi removido corretamente da lista ciclistasNovos
    const ciclistas = await ciclistaRepository.getCiclistas();
    const deletedCiclistaFromList = ciclistas.find((c) => c.id === ciclistaId);
    expect(deletedCiclistaFromList).toBeUndefined();
  });
  ;
  it("should get all ciclistas", async () => {
    // Adicione alguns ciclistas fictícios à lista ciclistasNovos
    const ciclistas: Ciclista[] = [
      {  id: 1,
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
      },{
        id:2,
        nome: 'Carlos Ramirez',
        nascimento: '1985-09-20',
        cpf: '4567890123',
        passaporte: {
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


    const result = await ciclistaRepository.getCiclistas();

    expect(result).toEqual(ciclistas);
  });

  it("should get a ciclista by ID", async () => {
    const ciclistaId = 123; // ID de um ciclista existente

    const result = await ciclistaRepository.getCiclistaByID(ciclistaId);

    // Verifique se o ciclista retornado possui o ID correto
    expect(result.id).toBe(ciclistaId);
  });

  it("should check if an email is available", async () => {
    const email = "example@example.com"; // Email a ser verificado

    const result = await ciclistaRepository.checkEmail(email);

    expect(result).toBeTruthy();
    
  });

  it("should activate a ciclista", async () => {
    const ciclistaId = 123; // ID de um ciclista existente

    const result = await ciclistaRepository.ativarCiclista(ciclistaId);

    expect(result).toBeTruthy();

  });
});