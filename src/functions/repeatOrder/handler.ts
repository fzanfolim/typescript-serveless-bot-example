import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';
import ClientModel  from "../../models/client.model";
import schema from './schema';
import {API} from '@libs/api';
import { FromSchema } from "json-schema-to-ts";
import MESSAGE from '@libs/message'

type Request = FromSchema<typeof schema>;

const repeatOrder: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      
      const request: Request = JSON.parse(record.body)
      let msg:string = MESSAGE.OPCOES_CATEGORY(request.firstName);

      const clientModel = new ClientModel({
        id: request.chatId,
        cpf: null,
        pedidos: null

      });  

      if(request.query.toUpperCase() == 'SIM'){
        const client = await clientModel.searchClient();
        console.log(client)
        clientModel.setPedidos(client.pedidos[client.pedidos.length - 1])
        clientModel.saveClient();
        msg =  MESSAGE.OBRIGADO; 
      }


      await API.post(`/sendMessage`,{
        chat_id: request.chatId,
        text: msg
      }) 


    }
  } catch (error) {
    console.log(error);
  }

}



export const main = repeatOrder;
