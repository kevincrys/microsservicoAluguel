import { Cartao } from 'src/schemas/cartao.schema';
import { CartaoRepository } from './cartao.repository';
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
  let repository: CartaoRepository;

  beforeEach(() => {
    repository = new CartaoRepository();
  });

  describe('insertCartao', () => {
    it('should insert Cartao', async () => {
      const novoCartao = {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      }
     
     const func= await repository.insertCartao(novoCartao);
     
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
      .spyOn(repository, 'getCartaos')
      .mockResolvedValue(cartaos)
      const updated = await repository.updateCartao(id, novoCartao);

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
      .spyOn(repository, 'getCartaos')
      .mockResolvedValue(cartaos)
      const updated = await repository.updateCartao(id, novoCartao);

      expect(updated).toBeUndefined();
    });
  });

 
 

  describe('getCartaoByID', () => {
    it('should return Cartao by matricula', async () => {
      const id = 3;
   

      jest
      .spyOn(repository, 'getCartaos')
      .mockResolvedValue(cartaos)

      const cartao = await repository.getCartaoByID(id);

      expect(cartao).toEqual({ ...cartaos[3], id });
    });

    it('should return undefined for non-existent Cartao', async () => {
      const id = 1234;
      jest
      .spyOn(repository, 'getCartaos')
      .mockResolvedValue(cartaos)
      const cartao = await repository.getCartaoByID(id);

      expect(cartao).toBeUndefined();
    });
  });
});