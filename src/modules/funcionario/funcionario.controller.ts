import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';

import { novoFuncionario } from "src/dto/novoFuncionario.dto";
import { Response } from 'express';
@Controller()
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post("/funcionario")
 async cadastrarFuncionario(
 @Body() novoFuncionario: novoFuncionario,
 @Res() res: Response): Promise<any> {
    console.log(novoFuncionario)
    const response= this.funcionarioService.insertFuncionario(novoFuncionario);
    return res.status(HttpStatus.OK).send(response);
  }

  @Get("/funcionario")
  async getFuncionario(
  @Res() res: Response): Promise<any> {
     console.log(novoFuncionario)
     const response= this.funcionarioService.getFuncionarios();
     return res.status(HttpStatus.OK).send(response);
   }
   
   @Put("/funcionario/:idFuncionario")
 async updateFuncionario(
 @Body() novoFuncionario: novoFuncionario,
 @Res() res: Response,@Param('idFuncionario') id): Promise<any> {
  const idbicicleta=  parseInt(id)
    const response= this.funcionarioService.updateFuncionario(idbicicleta,novoFuncionario);
    return res.status(HttpStatus.OK).send(response);
  }

  @Delete("/funcionario/:idFuncionario")
  async deleteFuncionario(
  @Res() res: Response,@Param('idFuncionario') id): Promise<any> {
    const idbicicleta=  parseInt(id)
     const response= this.funcionarioService.deleteFuncionario(idbicicleta);
     return res.status(HttpStatus.OK).send(response);
   }

   @Get("/funcionario/:idFuncionario")
   async getFuncionarioByID(
   @Res() res: Response,@Param('idFuncionario') id): Promise<any> {
      const idbicicleta=  parseInt(id)
      const response= this.funcionarioService.getFuncionarioByID(idbicicleta);
      return res.status(HttpStatus.OK).send(response);
    }
   

  // @Get("/funcionario/:idFuncionario")
  // recuperarFuncionario(@Param('idFuncionario') idFuncionario: string): string {
  //   return this.appService.getHello();
  // }

  // @Put("/funcionario/:idFuncionario")
  // alterarDadosFuncionario(@Param('idFuncionario') idFuncionario: string): string {
  //   return this.appService.getHello();
  // }

  // @Post("/funcionario/:idFuncionario/ativar")
  // ativarCadastroFuncionario(@Param('idFuncionario') idFuncionario: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/funcionario/:idFuncionario/permiteAluguel")
  // verificaPermissaoAluguel(@Param('idFuncionario') idFuncionario: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/funcionario/:idFuncionario/bicicletaAlugada")
  // obterBicicletaAlugada(@Param('idFuncionario') idFuncionario: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/funcionario/existeEmail/:email")
  // verificarEmailFuncionario(@Param('email') email: string): string {
  //   return this.appService.getHello();
  // }
}