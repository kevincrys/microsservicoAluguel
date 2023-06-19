import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';

import { novoFuncionario } from "../../dto/novoFuncionario.dto";
import { Response } from 'express';
@Controller()
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post("/funcionario")
 async cadastrarFuncionario(
 @Body() novoFuncionario: novoFuncionario,
 @Res() res: Response): Promise<any> {

    const response= await this.funcionarioService.insertFuncionario(novoFuncionario);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @Get("/funcionario")
  async getFuncionario(
  @Res() res: Response): Promise<any> {

     const response= await this.funcionarioService.getFuncionarios();
     return res.status(HttpStatus.OK).send(response);
   }
   
   @Put("/funcionario/:idFuncionario")
 async updateFuncionario(
 @Body() novoFuncionario: novoFuncionario,
 @Res() res: Response,@Param('idFuncionario') id): Promise<any> {
 
    const response= await this.funcionarioService.updateFuncionario(id,novoFuncionario);
    return res.status(HttpStatus.OK).send(response);
  }

  @Delete("/funcionario/:idFuncionario")
  async deleteFuncionario(
  @Res() res: Response,@Param('idFuncionario') id): Promise<any> {
  
     const response= await this.funcionarioService.deleteFuncionario(id);
     return res.status(HttpStatus.OK).send(response);
   }

   @Get("/funcionario/:idFuncionario")
   async getFuncionarioByID(
   @Res() res: Response,@Param('idFuncionario') id): Promise<any> {
 
      const response= await this.funcionarioService.getFuncionarioByID(id);
      return res.status(HttpStatus.OK).send(response);
    }
   

   
}