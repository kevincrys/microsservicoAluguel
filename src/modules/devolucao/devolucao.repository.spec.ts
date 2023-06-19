import { DevolucaoRepository } from './devolucao.repository';


import { nacionalidade } from '../../enums/nacionalidade.enum';
import { Devolucao } from '../../schemas/Devolucao.schema';
const devolucaosArray: Devolucao[] = [
  {
    "ciclista": 1,
    "trancaInicio": 1234,
    "bicicleta": 9876,
    "horaInicio": "2023-06-18T10:00:00",
    "trancaFim": 5678,
    "horaFim": "2023-06-18T11:30:00",
    "cobranca": 20.5
  },{
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

  beforeEach(() => {
    devolucaoRepository = new DevolucaoRepository();
  });

  afterEach(() => {
    devolucaoRepository = null;
  });

  it("should insert a new devolucao", async () => {
    const DevolucaoData: Devolucao = {
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