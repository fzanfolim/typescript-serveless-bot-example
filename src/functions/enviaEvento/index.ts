import schema from './schema';
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
      http: {
        method: 'post',
        path: 'enviaEvento',
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
