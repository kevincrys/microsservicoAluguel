
import { Test, TestingModule } from '@nestjs/testing';
import { DevolucaoRepository } from './devolucao.repository';
import { DevolucaoService } from './devolucao.service';
import { nacionalidade } from '../../enums/nacionalidade.enum';
import { emails } from '../../common/emails/emails';
import { CiclistaService } from '../ciclista/ciclista.service';
import { CiclistaModule } from '../ciclista/ciclista.module';
import { Tranca } from '../../schemas/trancas.schemas';
import { statusTranca } from '../../enums/statusTranca.enum';
import { statusCiclista } from '../../enums/statusCiclista.enum';
import { Utils } from '../../common/utils';
import { Api } from '../../common/api';
import { AluguelService } from '../aluguel/aluguel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devolucao } from '../../schemas/devolucao.schema';
import { mockDatabaseConfig } from '../../mockdatabase.config';
import { AluguelModule } from '../aluguel/aluguel.module';
import { Aluguel } from '../../schemas/aluguel.schema';
import { NotFoundException } from '@nestjs/common';

describe('DevolucaoService', () => {
  let devolucaoService: DevolucaoService;
  let devolucaoRepository: DevolucaoRepository;
  let ciclistaService: CiclistaService;
  let aluguelService: AluguelService;
let utils: Utils
let api: Api
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CiclistaModule,AluguelModule,TypeOrmModule.forFeature([Devolucao]),TypeOrmModule.forFeature([Aluguel]),TypeOrmModule.forRoot(mockDatabaseConfig)],
      providers: [DevolucaoService, DevolucaoRepository,Api],
      exports: [DevolucaoService,Api],
    }).compile();

    aluguelService = module.get<AluguelService>(AluguelService);
    ciclistaService = module.get<CiclistaService>(CiclistaService);
    devolucaoRepository = {
      insertDevolucao: jest.fn(),
      updateDevolucao: jest.fn(),
      ativarDevolucao: jest.fn(),
      deleteDevolucao: jest.fn(),
      getDevolucaoByID: jest.fn(),
      checkEmail: jest.fn(),
      getDevolucaos: jest.fn(),
    } as unknown as DevolucaoRepository;
    utils = {} as Utils;
    api = {} as Api;
    devolucaoService = new DevolucaoService(
      devolucaoRepository,
      utils,
      api,
      ciclistaService,
      aluguelService
    );
  });

const devolucao= {
    "ciclista": 1,
    "trancaFim": 1234,
    "bicicleta": 9876,
    "horaFim": "2023-06-18T10:00:00",
    "cobranca": 20.5
  }
const saidaDevolucao= {                                                                                                                                                                                                                                                  
    horaFim: '2023-06-18T10:00:00',
    bicicleta: 9876,
    ciclista: 1,
    cobranca: 1,
    horaInicio: '2023-06-18T10:00:00',
    trancaInicio: 1234,
    trancaFim: 1234
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
const aluguel= {
  "id":1,
 "ciclista": 1,
 "trancaInicio": 1234,
 "bicicleta": 9876,
 "horaInicio": "2023-06-18T10:00:00",
 "cobranca": 1
}
  describe('insertDevolucao', () => {
    it('should insert a devolucao and return true', async () => {

        
        ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(Ciclista);
        
        utils.checkNullOrBlank = jest.fn().mockReturnValue(false);
        api.getTrancaByid= jest.fn().mockResolvedValue(tranca);
        api.realizaCobrança= jest.fn().mockResolvedValue(20.5);
        devolucaoService.realizaCobrança= jest.fn().mockResolvedValue({id:1}); 
        api.trancarTranca=jest.fn()
        api.sendEmail= jest.fn();
       utils.getData= jest.fn().mockResolvedValue("2023-06-18T10:00:00");
       aluguelService.getAluguelByCiclista=jest.fn().mockResolvedValue(aluguel);
      devolucaoRepository.insertDevolucao = jest.fn().mockResolvedValue(devolucao);
      aluguelService.updateAluguel=jest.fn().mockResolvedValue(aluguel);
      const result = await devolucaoService.insertDevolucao(devolucao);

      
      expect(devolucaoService.realizaCobrança).toHaveBeenCalledWith(
        devolucao,"2023-06-18T10:00:00","2023-06-18T10:00:00"
      );
      expect(api.trancarTranca).toHaveBeenCalledWith(
        1234,9876
      );
      expect(api.sendEmail).toHaveBeenCalledWith({
        email: 'jane.smith@example.com',
        assunto: emails.devolucao.assunto,
        mensagem: emails.devolucao.mensagem
      });
      expect(devolucaoRepository.insertDevolucao).toHaveBeenCalledWith(
        saidaDevolucao,
      );
      expect(result).toBe(devolucao);
      
    });

    it("should throw an error if the ciclista doesn't exist", async () => {
      ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(null);
      utils.checkNullOrBlank = jest.fn().mockReturnValue(true);
      await expect(
        devolucaoService.insertDevolucao(devolucao),
      ).rejects.toThrow(NotFoundException)
      })


      it("should throw an error if the aluguel doesn't exist", async () => {
        // Mock para o primeiro checkNullOrBlank (retornar false)
    
  
      ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(Ciclista);
// Mock para o segundo checkNullOrBlank (retornar true)
       
        ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(Ciclista);
        utils.checkNullOrBlank = jest.fn().mockImplementation(() => false);
        api.getTrancaByid= jest.fn().mockResolvedValue(null);
        aluguelService.getAluguelByCiclista=jest.fn().mockResolvedValue(null);
        utils.checkNullOrBlank = jest.fn().mockImplementation(() => true);
        await expect(
          devolucaoService.insertDevolucao(devolucao),
        ).rejects.toThrow(NotFoundException)
        })

      it("should realiza cobranca with success", async () => {

        api.realizaCobrançaFila=  jest.fn().mockResolvedValue({id:1});
        await devolucaoService.realizaCobrança( devolucao,"2023-06-18T10:00:00","2023-06-18T12:00:00");
        expect(  api.realizaCobrançaFila).toHaveBeenCalledWith({"ciclista": 1, "valor": 20});
  });
});
});