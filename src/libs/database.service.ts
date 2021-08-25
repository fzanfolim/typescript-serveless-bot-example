import * as DynamoDB from 'aws-sdk/clients/dynamodb';

// Put
type PutItem = DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = DynamoDB.DocumentClient.PutItemOutput;

// Batch write
type BatchWrite = DynamoDB.DocumentClient.BatchWriteItemInput;
type BatchWriteOutPut = DynamoDB.DocumentClient.BatchWriteItemOutput;

// Update
type UpdateItem = DynamoDB.DocumentClient.UpdateItemInput;
type UpdateItemOutPut = DynamoDB.DocumentClient.UpdateItemOutput;

// Query
type QueryItem = DynamoDB.DocumentClient.QueryInput;
type QueryItemOutput = DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItem = DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = DynamoDB.DocumentClient.GetItemOutput;

// Delete
type DeleteItem = DynamoDB.DocumentClient.DeleteItemInput;
type DeleteItemOutput = DynamoDB.DocumentClient.DeleteItemOutput;

// type Item = {[index: string]: string};

// AWS.config.update({ region: "eu-west-1" });

const documentClient = new DynamoDB.DocumentClient();

export default class DatabaseService {

    create = async(params: PutItem): Promise<PutItemOutput> => {
        try {
            return await documentClient.put(params).promise();
        } catch (error) {
            throw new Error(error);
        }
    }

    batchCreate = async(params: BatchWrite): Promise<BatchWriteOutPut> => {
        try {
            return await documentClient.batchWrite(params).promise();
        } catch (error) {
            throw new Error(error);
        }
    }

    update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
        try {
            return await documentClient.update(params).promise();
        } catch (error) {
            throw new Error(error);
        }
    }

    query = async (params: QueryItem): Promise<QueryItemOutput> => {
        try {
            return await documentClient.query(params).promise();
        } catch (error) {
            throw new Error(error);
        }
    }

    get = async (params: GetItem): Promise<GetItemOutput> => {
        try {
            return await documentClient.get(params).promise();
        } catch (error) {
            throw new Error(error);
        }
    }

    delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
        try {
            return await documentClient.delete(params).promise();
        } catch (error) {
            throw new Error(error);
        }
    }
}