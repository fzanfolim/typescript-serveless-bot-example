// import { SQS } from 'aws-sdk';
import * as dialogflow from '@google-cloud/dialogflow';
// import { v4 as UUID } from 'uuid';
import { credentials }  from './credentials';


export interface ResponseDialogflow {
    query: string;
    response: string;
    intent: string;
    chatId:string;
    firstName?:string;
    lastName?:string;
}

export const dialogFlowMessage = async (message:string, sessao:string, projectId = 'pizzaplanet-lxth' ):Promise<ResponseDialogflow> => {

    const sessionId = sessao;
    
  //   const sessionClient = new dialogflow.SessionsClient({
  //     keyFilename:'/opt/nodejs/dialogflow/pizzaplanet-lxth-1e6b9c18ac64.json'
  // });
    const sessionClient = new dialogflow.SessionsClient({
      projectId,
      credentials
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: 'pt-BR',
          },
        },
      };

      const responses = await sessionClient.detectIntent(request);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log('  No intent matched.');
      }

      return {
          query:result.queryText,
          response: result.fulfillmentText,
          intent: result.intent.displayName,
          chatId:sessionId
      }
  
  }
