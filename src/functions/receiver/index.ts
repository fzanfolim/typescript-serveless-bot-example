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
        {"Fn::GetAtt": [ 'receiverQueue', 'Arn' ]}
      ]
    },
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
        'sqs:SendMessage',
      ],
      Resource: [
        {"Fn::GetAtt": [ 'repeatOrderQueue', 'Arn' ]}
      ]
    },
    {
      Effect: 'Allow',
      Action: [
        'sqs:SendMessage',
      ],
      Resource: [
        {"Fn::GetAtt": [ 'listItensQueue', 'Arn' ]}
      ]
    },
    {
      Effect: 'Allow',
      Action: [
        'sqs:SendMessage',
      ],
      Resource: [
        {"Fn::GetAtt": [ 'setProductQueue', 'Arn' ]}
      ]
    },
    {
      Effect: 'Allow',
      Action: [
        'events:PutEvents',
      ],
      Resource: [
        {"Fn::GetAtt": [ 'validadeCpfBus', 'Arn' ]}
      ]
    }

  ],
  events: [
    {
      sqs: {
        arn:{
          "Fn::GetAtt": [ 'receiverQueue', 'Arn' ]
        }
      }
    }
  ]
  ,
  layers:[
    { Ref: 'UuidDependenciesNodeModuleLambdaLayer' },
    { Ref: 'DialogflowDependenciesNodeModuleLambdaLayer' }
    
  ]
}
