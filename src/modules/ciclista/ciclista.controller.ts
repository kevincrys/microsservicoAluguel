import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CiclistaService } from './ciclista.service';

import { novoCiclista } from "src/dto/novoCiclista.dto";
import { Response } from 'express';
@Controller()
export class CiclistaController {
  constructor(private readonly ciclistaService: CiclistaService) {}

  @Post("/ciclista")
 async cadastrarCiclista(
 @Body() novoCiclista: novoCiclista,
 @Res() res: Response): Promise<any> {
    console.log(novoCiclista)
    const response= this.ciclistaService.insertCiclista(novoCiclista);
    return res.status(HttpStatus.OK).send(response);
  }

  @Get("/ciclista")
  async getCiclista(
  @Res() res: Response): Promise<any> {
     console.log(novoCiclista)
     const response= this.ciclistaService.getCiclistas();
     return res.status(HttpStatus.OK).send(response);
   }
   
   @Put("/ciclista/:idCiclista")
 async updateCiclista(
 @Body() novoCiclista: novoCiclista,
 @Res() res: Response,@Param('idCiclista') id): Promise<any> {
  const idbicicleta=  parseInt(id)
    const response= this.ciclistaService.updateCiclista(idbicicleta,novoCiclista);
    return res.status(HttpStatus.OK).send(response);
  }

  @Delete("/ciclista/:idCiclista")
  async deleteCiclista(
  @Res() res: Response,@Param('idCiclista') id): Promise<any> {
    const idbicicleta=  parseInt(id)
     const response= this.ciclistaService.deleteCiclista(idbicicleta);
     return res.status(HttpStatus.OK).send(response);
   }

   @Get("/ciclista/:idCiclista")
   async getCiclistaByID(
   @Res() res: Response,@Param('idCiclista') id): Promise<any> {
      const idbicicleta=  parseInt(id)
      const response= this.ciclistaService.getCiclistaByID(idbicicleta);
      return res.status(HttpStatus.OK).send(response);
    }
   

  // @Get("/ciclista/:idCiclista")
  // recuperarCiclista(@Param('idCiclista') idCiclista: string): string {
  //   return this.appService.getHello();
  // }

  // @Put("/ciclista/:idCiclista")
  // alterarDadosCiclista(@Param('idCiclista') idCiclista: string): string {
  //   return this.appService.getHello();
  // }

  // @Post("/ciclista/:idCiclista/ativar")
  // ativarCadastroCiclista(@Param('idCiclista') idCiclista: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/ciclista/:idCiclista/permiteAluguel")
  // verificaPermissaoAluguel(@Param('idCiclista') idCiclista: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/ciclista/:idCiclista/bicicletaAlugada")
  // obterBicicletaAlugada(@Param('idCiclista') idCiclista: string): string {
  //   return this.appService.getHello();
  // }

  // @Get("/ciclista/existeEmail/:email")
  // verificarEmailCiclista(@Param('email') email: string): string {
  //   return this.appService.getHello();
  // }
}