import { novoCartao } from "src/dto/novoCartao.dto";
import { Bicicleta } from "src/schemas/bicicleta.schema";
import { enviaEmail } from 'src/dto/enviaEmail.dto';
import { realizaCobrança } from "src/dto/realizaCobranca.dto";
import { Tranca } from "src/schemas/trancas.schemas";
import { UnprocessableEntityException } from "@nestjs/common";
const axios = require('axios');
const urlexterno = 'https://externo-pm.onrender.com';
const equipamento = 'https://ms-equipamento.vercel.app';
export class Api{
    async validaCartao(cartao:novoCartao): Promise<boolean> {
        console.log(cartao)
       
        const url =  `${urlexterno}/validaCartaoDeCredito`;
        try {
          const response = await axios.post(url, cartao, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if(response.status===200){return true}
          console.log('Resposta:', response.data);
        } catch (error) {
          console.error('Erro:', error);
          return false
        }
    
        return false
      }
      async sendEmail(enviaEmail: enviaEmail): Promise<boolean> {
        console.log("chamou aqui 2")
        
        const url =  `${urlexterno}/enviarEmail`;
        try {
          const response = await axios.post(url, enviaEmail, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Resposta:', response.data);
        } catch (error) {
          console.error('Erro:', error.message);
        }
        return true
      };
      
      async getBicicletaByid(id:number): Promise<Bicicleta> {
        // /bicicleta/{idBicicleta}:
    
        var bike: Bicicleta
     ;
      const url = `${equipamento}/bicicleta/${id}`;
      try {
        const response = await axios.get(url);
        console.log('Resposta:', response.data);
    
        bike=response.data
        console.log("bike",bike)
      } catch (error) {
        console.error('Erro:', error);
      }
        return bike
      }
      async getTrancaByid(id:number): Promise<Tranca> {
        // /bicicleta/{idBicicleta}:
    
        var tranca: Tranca
     ;
      const url = `${equipamento}/tranca/${id}`;
      try {
        const response = await axios.get(url);
        console.log('Resposta:', response.data);
    
        tranca=response.data
        return tranca
      } catch (error) {
        console.log(error.response.data.message)
      
        throw new UnprocessableEntityException(error?.response?.data?.message)
      }
        
      }

      async destrancaTranca(id: number,idbicicleta:number): Promise<any> {
        console.log("destrancaTranca")
        const url = `${equipamento}/tranca/${id}/destrancar`;
        const data = {
          bicicletaId: idbicicleta
        };
        try {
          const response = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Resposta:', response.data);
        } catch (error) {

          throw new UnprocessableEntityException(error?.response?.data?.message)
        }
      };
      async trancarTranca(id: number,idbicicleta:number): Promise<any> {

        const url = `${equipamento}/tranca/${id}/trancar`;
        const data = {
          bicicletaId: idbicicleta
        };
       
        try {
          const response = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

        } catch (error) {
          throw new UnprocessableEntityException(error?.response?.data?.message)
        }
      };

      async realizaCobrança(aluguel: realizaCobrança): Promise<any>  {
        console.log("realizaCobrança",aluguel)
        
        const url =  `${urlexterno}/cobranca`;
  
        try {
          const response = await axios.post(url, aluguel, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Resposta:', response.data);
          return response.data
        } catch (error) {
          console.log(error?.response.data.Mensagem)
          throw new UnprocessableEntityException(`realizaCobrança ${error?.response?.data?.message||error?.response?.data?.Mensagem}`)
        }
 
      };

      async realizaCobrançaFila(aluguel: realizaCobrança): Promise<any>  {
        console.log("realizaCobrança")
        
        const url =  `${urlexterno}/filaCobranca`;
  
        try {
          const response = await axios.post(url, aluguel, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Resposta:', response.data);
          return response.data
        } catch (error) {

          throw new UnprocessableEntityException(error?.response?.data?.message)
        }
 
      };

}