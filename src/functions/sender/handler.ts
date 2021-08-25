import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import {sendMessage} from '@libs/sqs'

const sender: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event,context) => {

  const region = context.invokedFunctionArn.split(':')[3];
  const accountId = context.invokedFunctionArn.split(':')[4];
  const queueName: string = 'receiverQueue';
  const queueUrl: string = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`

  await sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(event.body),
    
  })

  return formatJSONResponse({
    message: `'Mensagem na Fila!';`,
    event,
  });
}

export const main = middyfy(sender);
