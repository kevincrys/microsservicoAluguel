
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



describe('DevolucaoService', () => {
  let devolucaoService: DevolucaoService;
  let devolucaoRepository: DevolucaoRepository;
  let ciclistaService: CiclistaService;
let utils: Utils
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CiclistaModule],
      providers: [DevolucaoService, DevolucaoRepository],
      exports: [DevolucaoService, ],
    }).compile();
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
    devolucaoService = new DevolucaoService(
      devolucaoRepository,
      utils,
      ciclistaService,
    );
  });

const devolucao= {
    "ciclista": 1,
    "trancaFim": 1234,
    "bicicleta": 9876,
    "horaFim": "2023-06-18T10:00:00",
    "cobranca": 20.5
  }
const tranca: Tranca = {
    id: 1234,
    bicicleta: 9876,
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
  describe('insertDevolucao', () => {
    it('should insert a devolucao and return true', async () => {

        
        ciclistaService.getCiclistaByID=jest.fn().mockResolvedValue(Ciclista);
     
        utils.checkNullOrBlank = jest.fn().mockReturnValue(false);
      devolucaoService.mocktrancas= jest.fn().mockResolvedValue(tranca);
      devolucaoService.realizaCobrança= jest.fn().mockResolvedValue(20.5);
      devolucaoService.trancarTranca=jest.fn()
      devolucaoService.enviaEmail= jest.fn();
       utils.getData= jest.fn().mockResolvedValue("2023-06-18T10:00:00");
      devolucaoRepository.insertDevolucao = jest.fn().mockResolvedValue(devolucao);
      
      const result = await devolucaoService.insertDevolucao(devolucao);

      
      expect(devolucaoService.realizaCobrança).toHaveBeenCalledWith(
        cobranca,
      );
      expect(devolucaoService.trancarTranca).toHaveBeenCalledWith(
        1234,
      );
      expect(devolucaoService.enviaEmail).toHaveBeenCalledWith({
        email: 'jane.smith@example.com',
        assunto: emails.devolucao.assunto,
        mensagem: emails.devolucao.mensagem
      });
      expect(devolucaoRepository.insertDevolucao).toHaveBeenCalledWith(
        devolucao,
      );
      expect(result).toBe(devolucao);
      
    });

   
  });
});