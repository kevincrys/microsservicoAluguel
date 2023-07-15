import { DevolucaoRepository } from './devolucao.repository';


import { nacionalidade } from '../../enums/nacionalidade.enum';
import { Devolucao } from '../../schemas/devolucao.schema';
import { Repository } from 'typeorm';
const devolucaosArray: Devolucao[] = [
  {
    "id":1,
    "ciclista": 1,
    "trancaInicio": 1234,
    "bicicleta": 9876,
    "horaInicio": "2023-06-18T10:00:00",
    "trancaFim": 5678,
    "horaFim": "2023-06-18T11:30:00",
    "cobranca": 20.5
  },{
    "id":2,
    "ciclista": 2,
    "trancaInicio": 5678,
    "bicicleta": 5432,
    "horaInicio": "2023-06-18T11:30:00",
    "trancaFim": 9012,
    "horaFim": "2023-06-18T13:00:00",
    "cobranca": 15.75
  },

];
describe("DevolucaoRepository", () => {
  let devolucaoRepository: DevolucaoRepository;
  let repositoryMock: Partial<Repository<Devolucao>>;

  beforeEach(() => {
    repositoryMock = {
      save: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
    };

    devolucaoRepository = new DevolucaoRepository(repositoryMock as Repository<Devolucao>);
  });
  it("should insert a new devolucao", async () => {
    const DevolucaoData: Devolucao = {
      "id":1,
      "ciclista": 1,
      "trancaInicio": 1234,
      "bicicleta": 9876,
      "horaInicio": "2023-06-18T10:00:00",
      "trancaFim": 5678,
      "horaFim": "2023-06-18T11:30:00",
      "cobranca": 20.5
    };

    const result = await devolucaoRepository.insertDevolucao(DevolucaoData);

    expect(result).toEqual(DevolucaoData);
  });



});