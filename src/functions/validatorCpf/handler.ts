
import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';
import ClientModel, { ICliente }  from "../../models/client.model";
import schema from './schema';
import { API } from '@libs/api';
import { FromSchema } from "json-schema-to-ts";
import MESSAGE from '@libs/message'

type Request = FromSchema<typeof schema>;

const validatorCpf: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {

      let msg:string;
      
      const request: Request = JSON.parse(record.body)
      
      const clientModel = new ClientModel({
        id: request.chatId,
        cpf: request.query,
        pedidos: null

      });  
      const client:ICliente | null = await clientModel.searchClient()
      
      msg = client?.pedidos && client.pedidos.length > 0
        ? MESSAGE.MESMO_PEDIDO(client.pedidos[client.pedidos.length - 1], request.firstName)
        : MESSAGE.OPCOES_CATEGORY(request.firstName);

        if(!client) clientModel.saveClient()
        
      await API.post(`/sendMessage`,{
        chat_id: request.chatId,
        text: msg
      }) 


    }
  } catch (error) {
    console.log(error);
  }

}


export const main = validatorCpf;
