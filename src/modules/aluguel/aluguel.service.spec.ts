
import { Test, TestingModule } from '@nestjs/testing';
import { AluguelRepository } from './aluguel.repository';
import { AluguelService } from './aluguel.service';
import { nacionalidade } from '../../enums/nacionalidade.enum';
import { emails } from '../../common/emails/emails';
import { CiclistaService } from '../ciclista/ciclista.service';
import { CiclistaModule } from '../ciclista/ciclista.module';
import { Tranca } from '../../schemas/trancas.schemas';
import { statusTranca } from '../../enums/statusTranca.enum';
import { statusCiclista } from '../../enums/statusCiclista.enum';
import { Utils } from '../../common/utils';
import { Api } from '../../common/api';
import { mockDatabaseConfig } from '../../mockdatabase.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluguel } from '../../schemas/aluguel.schema';
import { NotFoundException } from '@nestjs/common';


describe('AluguelService', () => {
  let aluguelService: AluguelService;
  let aluguelRepository: AluguelRepository;
  let ciclistaService: CiclistaService;
let utils: Utils
let api: Api
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CiclistaModule,TypeOrmModule.forFeature([Aluguel]),TypeOrmModule.forRoot(mockDatabaseConfig)],
      providers: [AluguelService, AluguelRepository,Api],
      exports: [AluguelService,Api],
    }).compile();
    ciclistaService = module.get<CiclistaService>(CiclistaService);
    aluguelRepository = {
      insertAluguel: jest.fn(),
      updateAluguel: jest.fn(),
      ativarAluguel: jest.fn(),
      deleteAluguel: jest.fn(),
      getAluguelByID: jest.fn(),
      checkEmail: jest.fn(),
      getAluguels: jest.fn(),
    } as unknown as AluguelRepository;
    utils = {} as Utils;
    api = {} as Api;
    aluguelService = new AluguelService(
      aluguelRepository,
      utils,
      api,
      ciclistaService,
    );
  });

const aluguel= {
     "id":1,
    "ciclista": 1,
    "trancaInicio": 1234,
    "bicicleta": 9876,
    "horaInicio": "2023-06-18T10:00:00",
    "cobranca": 1
  }

  const alugelNovo= {
   "ciclista": 1,
   "trancaInicio": 1234,
   "bicicleta": 9876,
   "horaInicio": "2023-06-18T10:00:00",
   "cobranca": 1
 }
const tranca: Tranca = {
    id: 1234,
    bicicletaId: 9876,
    numero: 456,
    localizacao: "Localização 1",
    anoDeFabricacao: "2022",
    modelo: "Modelo 1",
    status: statusTranca.OCUPADA,
  };
const Ciclista={  id: 1,
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
const cobranca={"ciclista": 1, "valor": 10
}
  describe('insertAluguel', () => {
    it('should insert a aluguel and return true', async () => {
        ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(Ciclista);
        utils.checkNullOrBlank = jest.fn().mockReturnValue(false);   
        api.getTrancaByid= jest.fn().mockResolvedValue(tranca);
        api.realizaCobrança= jest.fn().mockResolvedValue({id:1});
        api.destrancaTranca=jest.fn()
        api.sendEmail= jest.fn();
       utils.getData= jest.fn().mockResolvedValue("2023-06-18T10:00:00");
      aluguelRepository.insertAluguel = jest.fn().mockResolvedValue(alugelNovo);
      
      const result = await aluguelService.insertAluguel(alugelNovo);
      expect(api.realizaCobrança).toHaveBeenCalledWith(
        cobranca,
      );
      expect(api.destrancaTranca).toHaveBeenCalledWith(
        1234,9876
      );
      expect(api.sendEmail).toHaveBeenCalledWith({
        email: 'jane.smith@example.com',
        assunto: emails.aluguel.assunto,
        mensagem: emails.aluguel.mensagem
      });
      expect(aluguelRepository.insertAluguel).toHaveBeenCalledWith(
        alugelNovo
      );
      expect(result).toBe(alugelNovo);
      
    });
 it("permiteAluguel deve retornar true ", async () => {
  aluguelRepository.permiteAluguel = jest.fn().mockResolvedValue(true);
  const result = await aluguelService.permiteAluguel(1);
  expect(result).toBe(true)

  });


  it("getBikeByCiclista shoud be succes ", async () => {
  aluguelRepository.getBikeByCiclista = jest.fn().mockResolvedValue(14);
  const result = await aluguelService.getBikeByCiclista(1);
  expect(result).toBe(14)
    });

  it("getAluguelByCiclista shoud be succes ", async () => {
  aluguelRepository.getAluguelByCiclista = jest.fn().mockResolvedValue(aluguel);
  const result = await aluguelService.getAluguelByCiclista(1);
  expect(result).toBe(aluguel)
      });
  
  it("updateAluguel shoud be succes ", async () => {
  aluguelRepository.updateAluguel = jest.fn().mockResolvedValue(aluguel);
  const result = await aluguelService.updateAluguel(1,aluguel);
  expect(result).toBe(aluguel)
            });
  
  it("updateAluguel throw by exception ", async () => {
  aluguelRepository.updateAluguel = jest.fn().mockResolvedValue(undefined);
  await expect(aluguelService.updateAluguel(1,aluguel)).rejects.toThrow(NotFoundException);
                        });

});
});