import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';
import DatabaseService from "@libs/database.service";
import ClientModel  from "../../models/client.model";
import schema from './schema';
import { API } from '@libs/api';
import { FromSchema } from "json-schema-to-ts";
import MESSAGE from '@libs/message'

type Request = FromSchema<typeof schema>;

// const setOrder: SQSHandler = async (event) => {
//   try {
//     for (const record of event.Records) {
      
//       const request: Request = JSON.parse(record.body)
//       const databaseService = new DatabaseService();
//       let response = request.response.split("|");

//       const products = await searchProducts(databaseService,response[1].toUpperCase()); 
//       const cliente = await searchClient(databaseService,request);
//       cliente.pedidos = cliente.pedidos || [];
//       let lastOrder = {
//                         item: products[parseInt(response[0]) - 1 ],
//                         id: "275a2fe0-fe9b-11eb-9e62-2df180cc3d65",
//                         categoria: response[1]
//                       };
//       cliente.pedidos.push(lastOrder);

//        if(cliente){
//           const clientModel = new ClientModel({
//             id: request.chatId,
//             cpf: cliente.cpf,
//             pedidos: cliente.pedidos
    
//           });  
        
//           const data = clientModel.getEntityMappings();
//           const params = {
//             TableName: process.env.LIST_TABLE,
//             Item: data
//         }
//           await databaseService.create(params);
 
//         }
      
      
//       await API.post(`/sendMessage`,{
//         chat_id: request.chatId,
//         text: MESSAGE.EFETIVA_ORDEM(lastOrder)
//       }) 


//     }
//   } catch (error) {
//     console.log(error);
//   }

// }


const setOrderEventBridge = async (event) => {
  try {

  
    const request: Request = event.detail
    const databaseService = new DatabaseService();
    let response = request.response.split("|");

    const products = await searchProducts(databaseService,response[1].toUpperCase()); 
    const cliente = await searchClient(databaseService,request);
    cliente.pedidos = cliente.pedidos || [];
    let lastOrder = {
                      item: products[parseInt(response[0]) - 1 ],
                      id: "275a2fe0-fe9b-11eb-9e62-2df180cc3d65",
                      categoria: response[1]
                    };
    cliente.pedidos.push(lastOrder);

     if(cliente){
        const clientModel = new ClientModel({
          id: request.chatId,
          cpf: cliente.cpf,
          pedidos: cliente.pedidos
  
        });  
      
        const data = clientModel.getEntityMappings();
        const params = {
          TableName: process.env.LIST_TABLE,
          Item: data
      }
        await databaseService.create(params);

      }
    
    
    await API.post(`/sendMessage`,{
      chat_id: request.chatId,
      text: MESSAGE.EFETIVA_ORDEM(lastOrder)
    }) 


        
  } catch (error) {
    console.log(error);
  }

}





const searchProducts = async (database:DatabaseService, category:string)=>{
  const searchParam = {
    TableName: process.env.LIST_TABLE,
    Key: {
      id: category,
    },
  };

  let message:any = await database.get(searchParam);
  return message.hasOwnProperty('Item') ? message.Item.produto : []

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



export const main = setOrderEventBridge;
