import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CadastroCiclista } from '../../dto/cadastroCiclista';
import { novoCiclista } from "../../dto/novoCiclista.dto";
import { Ciclista } from 'src/schemas/Ciclista.schema';
import { CiclistaRepository } from './ciclista.repository';
import { CartaoService } from '../cartao/cartao.service';
import { CiclistaService } from './ciclista.service';
import { Utils } from '../../common/utils';
import { nacionalidade } from 'src/enums/nacionalidade.enum';
import { emails } from 'src/common/emails/emails';

describe('CiclistaService', () => {
  let ciclistaService: CiclistaService;
  let ciclistaRepository: CiclistaRepository;
  let utils: Utils;
  let cartaoService: CartaoService;

  beforeEach(() => {
    ciclistaRepository = {
      insertCiclista: jest.fn(),
      updateCiclista: jest.fn(),
      ativarCiclista: jest.fn(),
      deleteCiclista: jest.fn(),
      getCiclistaByID: jest.fn(),
      checkEmail: jest.fn(),
      getCiclistas: jest.fn(),
    } as unknown as CiclistaRepository;

    utils = {} as Utils;

    cartaoService = {} as CartaoService;

    ciclistaService = new CiclistaService(
      ciclistaRepository,
      utils,
      cartaoService,
    );
  });
const newCiclista=  {
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
}
const newCartao= {
  nomeTitular: 'John Doe',
  numero: '1234567890123456',
  validade: '12/2025',
  cvv: '123',
}
  describe('insertCiclista', () => {
    it('should insert a ciclista and return true', async () => {
      const ciclista: CadastroCiclista = {
        Ciclista: newCiclista,
        MetodoDePagamento:  newCartao,
      };

      cartaoService.insertcartao = jest.fn();
      ciclistaRepository.insertCiclista = jest.fn().mockResolvedValue(true);

      const result = await ciclistaService.insertCiclista(ciclista);

      expect(cartaoService.insertcartao).toHaveBeenCalledWith(
        ciclista.MetodoDePagamento,
      );
      expect(ciclistaRepository.insertCiclista).toHaveBeenCalledWith(
        ciclista.Ciclista,
      );
      expect(ciclistaService.sendEmailMock).toHaveBeenCalledWith({
        email: 'john.doe@example.com',
        assunto: emails.cadastroCiclista.assunto,
        mensagem: emails.cadastroCiclista.mensagem,
      });
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if insertCiclista returns false', async () => {
      const ciclista: CadastroCiclista = {
        Ciclista: newCiclista,
        MetodoDePagamento: newCartao,
      };

      ciclistaRepository.insertCiclista = jest.fn().mockResolvedValue(false);

      await expect(ciclistaService.insertCiclista(ciclista)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if validaCartaoMock returns false', async () => {
      const ciclista: CadastroCiclista = {
        Ciclista: newCiclista,
        MetodoDePagamento: newCartao,
      };

      ciclistaService.validaCartaoMock = jest.fn().mockResolvedValue(false);

      await expect(ciclistaService.insertCiclista(ciclista)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateCiclista', () => {
    it('should update a ciclista and return true', async () => {
      const id = 1;
      const ciclista= newCiclista ;

      ciclistaRepository.updateCiclista = jest.fn().mockResolvedValue(true);

      const result = await ciclistaService.updateCiclista(id, ciclista);

      expect(ciclistaRepository.updateCiclista).toHaveBeenCalledWith(
        id,
        ciclista,
      );
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if updateCiclista returns false', async () => {
      const id = 1;
      const ciclista= newCiclista ;

      ciclistaRepository.updateCiclista = jest.fn().mockResolvedValue(false);

      await expect(
        ciclistaService.updateCiclista(id, ciclista),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('ativarCiclista', () => {
    it('should activate a ciclista and return true', async () => {
      const id = 1;

      ciclistaRepository.ativarCiclista = jest.fn().mockResolvedValue(true);

      const result = await ciclistaService.ativarCiclista(id);

      expect(ciclistaRepository.ativarCiclista).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if ativarCiclista returns false', async () => {
      const id = 1;

      ciclistaRepository.ativarCiclista = jest.fn().mockResolvedValue(false);

      await expect(
        ciclistaService.ativarCiclista(id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCiclista', () => {
    it('should delete a ciclista and return true', async () => {
      const id = 1;

      ciclistaRepository.deleteCiclista = jest.fn().mockResolvedValue(true);

      const result = await ciclistaService.deleteCiclista(id);

      expect(ciclistaRepository.deleteCiclista).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if deleteCiclista returns false', async () => {
      const id = 1;

      ciclistaRepository.deleteCiclista = jest.fn().mockResolvedValue(false);

      await expect(
        ciclistaService.deleteCiclista(id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCiclistaByID', () => {
    it('should get a ciclista by ID and return true', async () => {
      const id = 1;

      ciclistaRepository.getCiclistaByID = jest.fn().mockResolvedValue({});

      const result = await ciclistaService.getCiclistaByID(id);

      expect(ciclistaRepository.getCiclistaByID).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should throw NotFoundException if getCiclistaByID returns null', async () => {
      const id = 1;

      ciclistaRepository.getCiclistaByID = jest.fn().mockResolvedValue(null);

      await expect(
        ciclistaService.getCiclistaByID(id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('checkEmail', () => {
    it('should check email and return true', async () => {
      const email = 'test@example.com';

      utils.checkNullOrBlank = jest.fn().mockReturnValue(false);
      ciclistaRepository.checkEmail = jest.fn().mockResolvedValue(true);

      const result = await ciclistaService.checkEmail(email);

      expect(utils.checkNullOrBlank).toHaveBeenCalledWith(email);
      expect(ciclistaRepository.checkEmail).toHaveBeenCalledWith(email);
      expect(result).toBe(true);
    });

    it('should throw BadRequestException if email is null or blank', async () => {
      const email = '';

      utils.checkNullOrBlank = jest.fn().mockReturnValue(true);

      await expect(
        ciclistaService.checkEmail(email),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getCiclistas', () => {
    it('should get all ciclistas', async () => {
      const ciclistas: Ciclista[] = [];

      ciclistaRepository.getCiclistas = jest.fn().mockResolvedValue(ciclistas);

      const result = await ciclistaService.getCiclistas();

      expect(ciclistaRepository.getCiclistas).toHaveBeenCalled();
      expect(result).toEqual(ciclistas);
    });
  });

  describe('validaCartaoMock', () => {
    it('should return true', async () => {
      const result = await ciclistaService.validaCartaoMock();

      expect(result).toBe(true);
    });
  });

  describe('sendEmailMock', () => {
    it('should return true', async () => {
      const result = await ciclistaService.sendEmailMock();

      expect(result).toBe(true);
    });
  });
});