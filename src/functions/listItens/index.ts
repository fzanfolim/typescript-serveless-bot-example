import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatements: [
 
    {
      Effect: 'Allow',
      Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
      ],
      Resource: [
        {"Fn::GetAtt": [ 'ListTable', 'Arn' ]}
      ]
    },    
  ],
  events: [

    {
      eventBridge: {
        eventBus: '${self:custom.eventBusArn}',
        pattern:{
          source:[
            'listItens'
          ]
        }
      }
    }
  ]
  ,
  layers:[
    
  ]
}
