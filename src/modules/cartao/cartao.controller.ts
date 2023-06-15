import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CartaoService } from './cartao.service';

import { novoCartao } from "src/dto/novocartao.dto";
import { Response } from 'express';
@Controller()
export class CartaoController {
  constructor(private readonly cartaoService: CartaoService) {}

  @Post("/cartao")
 async cadastrarcartao(
 @Body() novocartao: novoCartao,
 @Res() res: Response): Promise<any> {
    console.log(novocartao)
    const response= this.cartaoService.insertcartao(novocartao);
    return res.status(HttpStatus.OK).send(response);
  }

  @Get("/cartao")
  async getcartao(
  @Res() res: Response): Promise<any> {
     console.log(novoCartao)
     const response= this.cartaoService.getcartaos();
     return res.status(HttpStatus.OK).send(response);
   }
   
   @Put("/cartao/:idcartao")
 async updatecartao(
 @Body() novocartao: novoCartao,
 @Res() res: Response,@Param('idcartao') id): Promise<any> {
  const idbicicleta=  parseInt(id)
    const response= this.cartaoService.updatecartao(idbicicleta,novocartao);
    return res.status(HttpStatus.OK).send(response);
  }

  @Delete("/cartao/:idcartao")
  async deletecartao(
  @Res() res: Response,@Param('idcartao') id): Promise<any> {
    const idbicicleta=  parseInt(id)
     const response= this.cartaoService.deletecartao(idbicicleta);
     return res.status(HttpStatus.OK).send(response);
   }

   @Get("/cartao/:idcartao")
   async getcartaoByID(
   @Res() res: Response,@Param('idcartao') id): Promise<any> {
      const idbicicleta=  parseInt(id)
      const response= this.cartaoService.getcartaoByID(idbicicleta);
      return res.status(HttpStatus.OK).send(response);
    }
   

  // @Get("/cartao/:idcartao")
  // recuperarcartao(@Param('idcartao') idcartao: string): string {
  //   return this.appService.getHello();
  // }

  // @Put("/cartao/:idcartao")
  // alterarDadoscartao(@Param('idcartao') idcartao: string): string {
  //   return this.appService.getHello();
  // }

  // @Post("/cartao/:idcartao/ativar")
  // ativarCadastrocartao(@Param('idcartao') idcartao: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/cartao/:idcartao/permiteAluguel")
  // verificaPermissaoAluguel(@Param('idcartao') idcartao: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/cartao/:idcartao/bicicletaAlugada")
  // obterBicicletaAlugada(@Param('idcartao') idcartao: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/cartao/existeEmail/:email")
  // verificarEmailcartao(@Param('email') email: string): string {
  //   return this.appService.getHello();
  // }
}