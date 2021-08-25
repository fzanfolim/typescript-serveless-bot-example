import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';
import DatabaseService from "@libs/database.service";
import ClientModel  from "../../models/client.model";
import schema from './schema';
import axios from 'axios';
import { FromSchema } from "json-schema-to-ts";
// import {sendMessage} from '@libs/sqs'
import MESSAGE from '@libs/message'

type Request = FromSchema<typeof schema>;

const validatorCpf: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      // const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      // console.log('Message Attributtes -->  ', messageAttributes.AttributeNameHere.stringValue);
      // console.log('Message Body2 -->  ', record.body);
      let msg:string;
      
      const request: Request = JSON.parse(record.body)
      const databaseService = new DatabaseService();
      const client = await searchClient(databaseService,request);

      
      msg = client?.pedidos && client.pedidos.length > 0
        ? MESSAGE.MESMO_PEDIDO(client.pedidos[client.pedidos.length - 1], request.firstName)
        : MESSAGE.OPCOES_CATEGORY(request.firstName);

      //criar cliente

        if(!client){
          console.log('incluindo ')
          const clientModel = new ClientModel({
            id: request.chatId,
            cpf: request.query,
            pedidos: null
    
          });  
        
          const data = clientModel.getEntityMappings();
          
          const params = {
            TableName: process.env.LIST_TABLE,
            Item: data
        }
          await databaseService.create(params);
 
        }

      await axios.post(`${process.env.TELEGRAM_URL}/sendMessage`,{
        chat_id: request.chatId,
        text: msg
      }) 


    }
  } catch (error) {
    console.log(error);
  }

}



const searchClient = async (database:DatabaseService, request:{[key:string]:any})=>{
  const searchParam = {
    TableName: process.env.LIST_TABLE,
    Key: {
      id: request.chatId,
    },
  };

  let message:any = await database.get(searchParam);
  return message.hasOwnProperty('Item') ? message.Item : null

}



export const main = validatorCpf;
