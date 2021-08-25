import schema from './schema';
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
    }
  ],
  events: [
    {
      http: {
        method: 'post',
        path: 'sender',
        request: {
          schema: {
            'application/json': schema
          }
        },
        cors: true
      }
    }
  ]
}
