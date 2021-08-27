import 'source-map-support/register';

// import { SQSHandler } from 'aws-lambda';
import ProductModel  from "../../models/product.model";
import schema from './schema';
import { API } from '@libs/api';
import { FromSchema } from "json-schema-to-ts";
import MESSAGE from '@libs/message'

type Request = FromSchema<typeof schema>;

// const listItens: SQSHandler = async (event) => {
//   try {
//     for (const record of event.Records) {
      
//       const request: Request = JSON.parse(record.body);
//       const productModel = new ProductModel({
//         id: request.response.toUpperCase()
//       }); 

//       const products  = await productModel.searchProducts(); 
//       let listProduct = await Promise.all(products.map((item,index) => `${index + 1} - ${item} `));
      
      
//       await API.post(`/sendMessage`,{
//         chat_id: request.chatId,
//         text: MESSAGE.LISTA_PRODUTOS(listProduct.join('\n'))
//       }) 


//     }
//   } catch (error) {
//     console.log(error);
//   }

// }


const listItensBridge = async (event) => {
  try {


    const request: Request = event.detail
    const productModel = new ProductModel({
      id: request.response.toUpperCase()
    }); 

    const products  = await productModel.searchProducts(); 
    let listProduct = await Promise.all(products.map((item,index) => `${index + 1} - ${item} `));
    
    
    await API.post(`/sendMessage`,{
      chat_id: request.chatId,
      text: MESSAGE.LISTA_PRODUTOS(listProduct.join('\n'))
    }) 



        
  } catch (error) {
    console.log(error);
  }

}

export const main = listItensBridge;
