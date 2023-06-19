import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CartaoService } from './cartao.service';

import { novoCartao } from "../../dto/novocartao.dto";
import { Response } from 'express';
@Controller()
export class CartaoController {
  constructor(private readonly cartaoService: CartaoService) {}

  @Post("/cartao")
 async cadastrarCartao(
 @Body() novocartao: novoCartao,
 @Res() res: Response): Promise<any> {

    const response= await this.cartaoService.insertCartao(novocartao);
    return res.status(HttpStatus.CREATED).send(response);
  }


  
   @Put("/cartao/:idcartao")
 async updateCartao(
 @Body() novocartao: novoCartao,
 @Res() res: Response,@Param('idcartao') id): Promise<any> {
  const idbicicleta=  parseInt(id)
    const response= await this.cartaoService.updateCartao(idbicicleta,novocartao);
    return res.status(HttpStatus.OK).send(response);
  }

   @Get("/cartao/:idcartao")
   async getCartaoByID(
   @Res() res: Response,@Param('idcartao') id): Promise<any> {
      const idbicicleta=  parseInt(id)
      const response= await this.cartaoService.getCartaoByID(idbicicleta);
      return res.status(HttpStatus.OK).send(response);
    }
   

}