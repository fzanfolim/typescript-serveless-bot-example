import 'source-map-support/register';

import { SQSHandler } from 'aws-lambda';
import { dialogFlowMessage, ResponseDialogflow } from "./dialogflow"
import {API} from '@libs/api';
import {sendMessage} from '@libs/sqs'
import MESSAGE from '@libs/message'


const API_URL = `${process.env.TELEGRAM_URL}/sendMessage`

const receiver: SQSHandler = async (event,context) => {
  try {
    for (const record of event.Records) {
      // const messageAttributes: SQSMessageAttributes = record.messageAttributes;
      // console.log('Message Attributtes -->  ', messageAttributes.AttributeNameHere.stringValue);
      // console.log('Message Body -->  ', record.body);

      let responseDialog:ResponseDialogflow = await dialogFlowMessage(
        JSON.parse(record.body).message.text,
        JSON.parse(record.body).message.chat.id.toString()
      )

      responseDialog.firstName = JSON.parse(record.body).message.chat.first_name;
      responseDialog.lastName = JSON.parse(record.body).message.chat.last_name;

      await forwarding(responseDialog,context)

    }
  } catch (error) {
    console.log(error);
  }

}

const forwarding = async(response:ResponseDialogflow,context) => {
  console.log(`|${response.intent}|`)
  switch(response.intent) { 

    case 'Default Welcome Intent': { 
      
      await API.post(`/sendMessage`,{
        chat_id: response.chatId,
        text: MESSAGE.BOAS_VINDAS
      })
      break; 
    } 

    case 'Default Fallback Intent': { 
      await API.post(`/sendMessage`,{
        chat_id: response.chatId,
        text: response.response
      })
       
      break; 
    } 
    case 'Valida Cpf': { 
      insertQueue(response,context,'validateCpfQueue')
       
      break; 
    } 
    case 'Repeat Order': { 
      insertQueue(response,context,'repeatOrderQueue')
       
      break; 
    } 
    case 'Escolha da Categoria': { 
      insertQueue(response,context,'listItensQueue')
       
      break; 
    } 
    case 'Escolha do Produto': { 
      insertQueue(response,context,'setProductQueue')
       
      break; 
    } 

    default: { 
       console.log('Caiu do default ---->>> ', response.intent)
       break; 
    } 
 } 

}


const insertQueue = async (textDialog,context,queueName:string)=> {

  const region = context.invokedFunctionArn.split(':')[3];
  const accountId = context.invokedFunctionArn.split(':')[4];
  const queueUrl: string = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`

  await sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(textDialog),
    
  })

}





export const main = receiver;
