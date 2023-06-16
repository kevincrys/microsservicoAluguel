import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { AluguelService } from './aluguel.service';


import { Response } from 'express';

import { NovoAluguel } from '../../dto/novoAluguel.dto';
@Controller()
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService,
    ) {}

  @Post("/aluguel")
 async cadastrarAluguel(
 @Body() cadastroAluguel: NovoAluguel,
 @Res() res: Response): Promise<any> {
    const response= this.aluguelService.insertAluguel(cadastroAluguel)

    

    
    
    return res.status(HttpStatus.OK).send(response);
  }

  
}