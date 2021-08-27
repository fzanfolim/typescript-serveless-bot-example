import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatements: [
    // {
    //   Effect: 'Allow',
    //   Action: [
    //     'sqs:SendMessage',
    //   ],
    //   Resource: [
    //     {"Fn::GetAtt": [ 'setProductQueue', 'Arn' ]}
    //   ]
    // },
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
    // {
    //   sqs: {
    //     arn:{
    //       "Fn::GetAtt": [ 'setProductQueue', 'Arn' ]
    //     }
    //   }
    // }
    {
      eventBridge: {
        eventBus: '${self:custom.eventBusArn}',
        pattern:{
          source:[
            'setProduct'
          ]
        }
      }
    }
  ]
  ,
  layers:[
    
  ]
}
