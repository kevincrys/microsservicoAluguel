import { novoCartao } from "src/dto/novoCartao.dto";
import { Bicicleta } from "src/schemas/bicicleta.schema";
import { enviaEmail } from 'src/dto/enviaEmail.dto';
const axios = require('axios');
const urlexterno = 'https://externo-pm.onrender.com';
const equipamento = 'https://ms-equipamento.vercel.app';
export class Api{
    async validaCartaoMock(cartao:novoCartao): Promise<boolean> {
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
}