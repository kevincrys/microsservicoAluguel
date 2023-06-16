import { CartaoRepository } from './cartao.repository';

describe('CartaoRepository', () => {
  let repository: CartaoRepository;

  beforeEach(() => {
    repository = new CartaoRepository();
  });

  it('should insert cartao', () => {
    const cartao = {
      nomeTitular: 'John Doe',
      numero: '1234567890',
      validade: '12/24',
      cvv: '123',
    };

    repository.insertcartao(cartao);

    expect(repository.getcartaoByID(1)).toEqual({
      id: 1,
      ...cartao,
    });
  });

  it('should update cartao', () => {
    const cartao = {
      nomeTitular: 'John Doe',
      numero: '1234567890',
      validade: '12/24',
      cvv: '123',
    };

    repository.insertcartao(cartao);

    const updatedCartao = {
      nomeTitular: 'Jane Smith',
      numero: '9876543210',
      validade: '01/26',
      cvv: '456',
    };

    repository.updatecartao(1, updatedCartao);

    expect(repository.getcartaoByID(1)).toEqual({
      id: 1,
      ...updatedCartao,
    });
  });

  it('should delete cartao', () => {
    const cartao = {
      nomeTitular: 'John Doe',
      numero: '1234567890',
      validade: '12/24',
      cvv: '123',
    };

    repository.insertcartao(cartao);

    expect(repository.getcartaoByID(1)).toBeDefined();

    repository.deletecartao(1);

    expect(repository.getcartaoByID(1)).toBeUndefined();
  });

  it('should get cartao by ID', () => {
    const cartao = {
      nomeTitular: 'John Doe',
      numero: '1234567890',
      validade: '12/24',
      cvv: '123',
    };

    repository.insertcartao(cartao);

    expect(repository.getcartaoByID(1)).toEqual({
      id: 1,
      ...cartao,
    });
  });
});