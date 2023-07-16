
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
    "ciclista": 1,
    "trancaInicio": 1234,
    "bicicleta": 9876,
    "horaInicio": "2023-06-18T10:00:00",
    "cobranca": 20.5
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
const cobranca={"ciclista": 1, "valor": 30
}
  describe('insertAluguel', () => {
    it('should insert a aluguel and return true', async () => {

        
        ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(Ciclista);
        utils.checkNullOrBlank = jest.fn().mockReturnValue(false);
      
        api.getTrancaByid= jest.fn().mockResolvedValue(tranca);
        api.realizaCobrança= jest.fn().mockResolvedValue(20.5);
        api.destrancaTranca=jest.fn()
        api.sendEmail= jest.fn();
       utils.getData= jest.fn().mockResolvedValue("2023-06-18T10:00:00");
      aluguelRepository.insertAluguel = jest.fn().mockResolvedValue(aluguel);
      
      const result = await aluguelService.insertAluguel(aluguel);

      
      expect(api.realizaCobrança).toHaveBeenCalledWith(
        cobranca,
      );
      expect(api.destrancaTranca).toHaveBeenCalledWith(
        1234,
      );
      expect(api.sendEmail).toHaveBeenCalledWith({
        email: 'jane.smith@example.com',
        assunto: emails.aluguel.assunto,
        mensagem: emails.aluguel.mensagem
      });
      expect(aluguelRepository.insertAluguel).toHaveBeenCalledWith(
        aluguel,
      );
      expect(result).toBe(aluguel);
      
    });

   
  });
});