import { AluguelRepository } from './aluguel.repository';


import { nacionalidade } from '../../enums/nacionalidade.enum';
import { Aluguel } from 'src/schemas/Aluguel.schema';
const aluguelsArray: Aluguel[] = [
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
describe("AluguelRepository", () => {
  let aluguelRepository: AluguelRepository;

  beforeEach(() => {
    aluguelRepository = new AluguelRepository();
  });

  afterEach(() => {
    aluguelRepository = null;
  });

  it("should insert a new aluguel", async () => {
    const AluguelData: Aluguel = {
      "ciclista": 1,
      "trancaInicio": 1234,
      "bicicleta": 9876,
      "horaInicio": "2023-06-18T10:00:00",
      "trancaFim": 5678,
      "horaFim": "2023-06-18T11:30:00",
      "cobranca": 20.5
    };

    const result = await aluguelRepository.insertAluguel(AluguelData);

    expect(result).toEqual(AluguelData);
  });

  it("should get a  Bike By Ciclista ID", async () => {
    const aluguelId = 1;
    jest
    .spyOn(aluguelRepository, 'getAluguels')
    .mockResolvedValue(aluguelsArray)
    const result = await aluguelRepository.getBikeByCiclista(aluguelId);


    expect(result).toBe(9876);
  });

  it("should check if permiteAluguel already exist aluguel", async () => {
    const aluguelId = 1;
    jest
    .spyOn(aluguelRepository, 'getAluguels')
    .mockResolvedValue(aluguelsArray)
    const result = await aluguelRepository.permiteAluguel(aluguelId);


    expect(result).toBe(false);
    
  });

  it("should check if permiteAluguel not already exist aluguel ", async () => {
    const aluguelId = 5;
    jest
    .spyOn(aluguelRepository, 'getAluguels')
    .mockResolvedValue(aluguelsArray)
    const result = await aluguelRepository.permiteAluguel(aluguelId);

 
    expect(result).toBe(true);
    
  });

});