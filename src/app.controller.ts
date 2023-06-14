import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/ciclista")
  cadastrarCiclista(): string {
    return this.appService.getHello();
  }

  @Get("/ciclista/:idCiclista")
  recuperarCiclista(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Put("/ciclista/:idCiclista")
  alterarDadosCiclista(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Post("/ciclista/:idCiclista/ativar")
  ativarCadastroCiclista(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Get("/ciclista/:idCiclista/permiteAluguel")
  verificaPermissaoAluguel(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Get("/ciclista/:idCiclista/bicicletaAlugada")
  obterBicicletaAlugada(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Get("/ciclista/existeEmail/:email")
  verificarEmailCiclista(@Param('email') email: string): string {
    return this.appService.getHello();
  }

  @Get("/funcionario")
  recuperarFuncionarios(): string {
    return this.appService.getHello();
  }

  @Post("/funcionario")
  cadastrarFuncionario(): string {
    return this.appService.getHello();
  }

  @Get("/funcionario/:idFuncionario")
  recuperarFuncionario(@Param('idFuncionario') idFuncionario: string): string {
    return this.appService.getHello();
  }

  @Put("/funcionario/:idFuncionario")
  editarFuncionario(@Param('idFuncionario') idFuncionario: string): string {
    return this.appService.getHello();
  }

  @Delete("/funcionario/:idFuncionario")
  removerFuncionario(@Param('idFuncionario') idFuncionario: string): string {
    return this.appService.getHello();
  }

  @Get("/cartaoDeCredito/:idCiclista")
  recuperarDadosCartaoCredito(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Put("/cartaoDeCredito/:idCiclista")
  alterarDadosCartaoCredito(@Param('idCiclista') idCiclista: string): string {
    return this.appService.getHello();
  }

  @Post("/aluguel")
  realizarAluguel(): string {
    return this.appService.getHello();
  }

  @Post("/devolucao")
  realizarDevolucao(): string {
    return this.appService.getHello();
  }
}
