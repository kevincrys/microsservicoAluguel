import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { DevolucaoService } from './devolucao.service';


import { Response } from 'express';

import { NovaDevolucao } from '../../dto/novaDevolucao.dto';
@Controller()
export class DevolucaoController {
  constructor(private readonly devolucaoService: DevolucaoService,
    ) {}

  @Post("/devolucao")
 async cadastrarDevolucao(
 @Body() cadastroDevolucao: NovaDevolucao,
 @Res() res: Response): Promise<any> {
    const response= this.devolucaoService.insertDevolucao(cadastroDevolucao)

    

    
    
    return res.status(HttpStatus.OK).send(response);
  }

  
}