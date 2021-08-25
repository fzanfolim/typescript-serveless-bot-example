// import { SQS } from 'aws-sdk';
import * as SQS from 'aws-sdk/clients/sqs';

const sqs = new SQS();

export const sendMessage = async (message:SQS.Types.SendMessageRequest) => {
    return  await sqs.sendMessage({
        QueueUrl: message.QueueUrl,
        MessageBody: message.MessageBody,
        MessageAttributes: {
          AttributeNameHere: {
            StringValue: 'Attribute Value Here',
            DataType: 'String',
          },
        },
      }).promise();
  }
