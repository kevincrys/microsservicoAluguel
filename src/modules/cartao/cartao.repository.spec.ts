import { Cartao } from '../../schemas/cartao.schema';
import { CartaoRepository } from './cartao.repository';
import { Repository } from 'typeorm';
jest.mock('uuid', () => ({
  __esModule: true,
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));
const cartaos: Cartao[] = [
   {
    id:1,
    nomeTitular: 'John Doe',
    numero: '1231231231',
    validade: '12/23',
    cvv: '123',
  },
  {
    id:2,
    nomeTitular: 'jorge',
    numero: '34123123132',
    validade: '06/11',
    cvv: '123',
  },
  {
    id:4,
    nomeTitular: 'tese',
    numero: '123123213123',
    validade: '12/12',
    cvv: '123',
  },
  {
    id:3,
    nomeTitular: 'John ew',
    numero: '124213123123',
    validade: '12/09',
    cvv: '123',
  },
];
describe('CartaoRepository', () => {
  let cartaoRepository: CartaoRepository;
  let repositoryMock: Partial<Repository<Cartao>>;

  beforeEach(() => {
    repositoryMock = {
      save: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
    };

    cartaoRepository = new CartaoRepository(repositoryMock as Repository<Cartao>);
  });

  describe('insertCartao', () => {
    it('should insert Cartao', async () => {
      const novoCartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      }
     
     const func= await cartaoRepository.insertCartao(novoCartao,1);
     
     expect(func).toEqual(
      expect.objectContaining({
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      })
    );
    });
  });

  describe('updateCartao', () => {
    it('should update Cartao by matricula', async () => {
      const id = 1;
      const novoCartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };
      jest
      .spyOn(repositoryMock, 'findOne')
      .mockResolvedValue(cartaos[1])
      const updated = await cartaoRepository.updateCartao(id, novoCartao);

      expect(updated).toStrictEqual({ ...novoCartao, id });

    });

    it('should return false when trying to update non-existent Cartao', async () => {
      const id = 1123;
      const novoCartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };
      jest
      .spyOn(repositoryMock, 'findOne')
      .mockResolvedValue(cartaos[1])
      const updated = await cartaoRepository.updateCartao(id, novoCartao);

      expect(updated).toBeUndefined();
    });
  });

 
 

  describe('getCartaoByID', () => {
    it('should return Cartao by matricula', async () => {
      const id = 3;
   

      jest
      .spyOn(repositoryMock, 'findOne')
      .mockResolvedValue(cartaos[3])

      const cartao = await cartaoRepository.getCartaoByID(id);

      expect(cartao).toEqual({ ...cartaos[3], id });
    });

    it('should return undefined for non-existent Cartao', async () => {
      const id = 1234;
      jest
      .spyOn(repositoryMock, 'findOne')
      .mockResolvedValue(cartaos[1])
      const cartao = await cartaoRepository.getCartaoByID(id);

      expect(cartao).toBeUndefined();
    });
  });
});