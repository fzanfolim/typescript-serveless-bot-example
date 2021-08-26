import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: [
        'sqs:SendMessage',
      ],
      Resource: [
        {"Fn::GetAtt": [ 'validadeCpfQueue', 'Arn' ]}
      ]
    },
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
    //       "Fn::GetAtt": [ 'validadeCpfQueue', 'Arn' ]
    //     }
    //   }
    // }
    {
      eventBridge: {
        eventBus: '${self:custom.eventBusArn2}',
        pattern:{
          source:[
            'validatorCpf'
          ]
        }
      }
    }
  ]
  ,
  layers:[
    { Ref: 'UuidDependenciesNodeModuleLambdaLayer' }
    
  ]
}
