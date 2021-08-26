import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import EventBridge  from '@libs/eventBridge'

const sendEvent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const eventBridge = new EventBridge({
    EventBusName: 'orders',
    Source: 'elk.orders',
    DetailType: 'order',
    Detail: event 
  })

  await eventBridge.putEvents();

  return formatJSONResponse({
    message: `Evento criado com sucesso!`,
    event,
  });
}

export const main = middyfy(sendEvent);
