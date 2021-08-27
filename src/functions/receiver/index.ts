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
        {"Fn::GetAtt": [ 'chatPizzaBus', 'Arn' ]}
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
