import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'events:PutEvents',
      ],
      Resource: [
        {"Fn::GetAtt": [ 'orders', 'Arn' ]}
      ]
    }
   
  ],
  events: [
    {
      eventBridge: {
        eventBus: '${self:custom.eventBusArn}',
        pattern:{
          source:[
            'elk.orders'
          ]
        }
      }
    }
  ]
}
