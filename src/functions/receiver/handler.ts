import 'source-map-support/register';

// import { SQSHandler } from 'aws-lambda';
import { dialogFlowMessage, ResponseDialogflow } from "./dialogflow"
import {API} from '@libs/api';
// import {sendMessage} from '@libs/sqs'
import MESSAGE from '@libs/message'
import EventBridge  from '@libs/eventBridge'

export enum Intent {
  DEFAULT = 'Default Welcome Intent',
  FALLBACK = 'Default Fallback Intent',
  VALIDATE_CPF = 'Valida Cpf',
  REPEAT_ORDER = 'Repeat Order',
  SET_CATEGORY = 'Escolha da Categoria',
  SET_PRODUCT = 'Escolha do Produto',

}

const receiver= async (event,context) => {
  try {
    for (const record of event.Records) {

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

    case Intent.DEFAULT: { 
      await API.post(`/sendMessage`,{
        chat_id: response.chatId,
        text: MESSAGE.BOAS_VINDAS
      })
      break; 
    } 

    case Intent.FALLBACK: { 
      await API.post(`/sendMessage`,{
        chat_id: response.chatId,
        text: response.response
      })
       
      break; 
    } 
    case Intent.VALIDATE_CPF: { 
      // insertQueue(response,context,'validateCpfQueue')
      await insertEventBridge(response,'validatorCpf')
       
      break; 
    } 
    case Intent.REPEAT_ORDER: { 
      // await insertQueue(response,context,'repeatOrderQueue')
      await insertEventBridge(response,'repeatOrder')       
      break; 
    } 
    case Intent.SET_CATEGORY: { 
      // await insertQueue(response,context,'listItensQueue')
      await insertEventBridge(response,'listItens')       
       
      break; 
    } 
    case Intent.SET_PRODUCT: { 
      // await insertQueue(response,context,'setProductQueue')
      await insertEventBridge(response,'setProduct')
       
      break; 
    } 

    default: { 
       console.log('Caiu do default ---->>> ', response.intent)
       break; 
    } 
 } 

}


// const insertQueue = async (textDialog,context,queueName:string)=> {

//   const region = context.invokedFunctionArn.split(':')[3];
//   const accountId = context.invokedFunctionArn.split(':')[4];
//   const queueUrl: string = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`

//   await sendMessage({
//     QueueUrl: queueUrl,
//     MessageBody: JSON.stringify(textDialog),
    
//   })

// }

const insertEventBridge = async (textDialog,source):Promise<void> => {

  const eventBridge = new EventBridge({
    EventBusName: 'chatPizzaBus',
    Source: source,
    DetailType: source,
    Detail: textDialog 
  })

  await eventBridge.putEvents();

}




export const main = receiver;

