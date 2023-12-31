import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CiclistaService } from './ciclista.service';

import { novoCiclista } from "../../dto/novoCiclista.dto";
import { Response } from 'express';

import { CadastroCiclista } from '../../dto/cadastroCiclista.dto';
@Controller()
export class CiclistaController {
  constructor(private readonly ciclistaService: CiclistaService,
    ) {}

  @Post("/ciclista")
 async cadastrarCiclista(
 @Body() cadastroCiclista: CadastroCiclista,
 @Res() res: Response): Promise<any> {
    const response= await this.ciclistaService.insertCiclista(cadastroCiclista)

    
    return res.status(HttpStatus.CREATED).send(response);
  }

  @Get("/ciclista")
  async getCiclista(
  @Res() res: Response): Promise<any> {
  
     const response= await this.ciclistaService.getCiclistas();
     return res.status(HttpStatus.OK).send(response);
   }
   
   @Put("/ciclista/:idCiclista")
 async updateCiclista(
 @Body() novoCiclista: novoCiclista,
 @Res() res: Response,@Param('idCiclista') id): Promise<any> {
  const idbicicleta=  parseInt(id)
    const response= await this.ciclistaService.updateCiclista(idbicicleta,novoCiclista);
    return res.status(HttpStatus.OK).send(response);
  }

  @Delete("/ciclista/:idCiclista")
  async deleteCiclista(
  @Res() res: Response,@Param('idCiclista') id): Promise<any> {
    const idbicicleta=  parseInt(id)
     const response= await this.ciclistaService.deleteCiclista(idbicicleta);
     return res.status(HttpStatus.OK).send(response);
   }

   @Get("/ciclista/:idCiclista")
   async getCiclistaByID(
   @Res() res: Response,@Param('idCiclista') id): Promise<any> {
      const idbicicleta=  parseInt(id)
      const response= await this.ciclistaService.getCiclistaByID(idbicicleta);
      return res.status(HttpStatus.OK).send(response);
    }
   
    @Post("/ciclista/:idCiclista/ativar")
    async ativarCiclista(
    @Res() res: Response,@Param('idCiclista') id): Promise<any> {
       const idbicicleta=  parseInt(id)
       const response= await this.ciclistaService.ativarCiclista(idbicicleta);
       return res.status(HttpStatus.OK).send(response);
     }

     @Get("/ciclista/existeEmail/:email")
   async checkEmail(
   @Res() res: Response,@Param('email') email): Promise<any> {
      const response= await this.ciclistaService.checkEmail(email);
      return res.status(HttpStatus.OK).send(response);
    }
    @Get("/ciclista/:idCiclista/permiteAluguel")
    async permiteAluguel(
    @Res() res: Response,@Param('idCiclista') id): Promise<any> {
      const idbicicleta=  parseInt(id)
       const response= await this.ciclistaService.permiteAluguel(idbicicleta);
       return res.status(HttpStatus.OK).send(response);
     }
     @Get("/ciclista/:idCiclista/bicicletaAlugada")
     async getBikeByCiclista(
     @Res() res: Response,@Param('idCiclista') id): Promise<any> {
        const idbicicleta=  parseInt(id)
        const response= await this.ciclistaService.getBikeByCiclista(idbicicleta);
        return res.status(HttpStatus.OK).send(response);
      }
  
}